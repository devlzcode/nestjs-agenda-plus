import { DiscoveryService, MetadataScanner, ModuleRef } from "@nestjs/core";
import type { OnModuleInit } from "@nestjs/common";
import { Logger, Injectable } from "@nestjs/common";
import { Agenda } from "agenda";
import { AgendaMetadataAccessor } from "./agenda.metadata-accessor";

@Injectable()
export class AgendaExplorer implements OnModuleInit {
  private readonly logger = new Logger(AgendaExplorer.name);

  constructor(
    private readonly modRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly metadataAccessor: AgendaMetadataAccessor,
  ) {}

  onModuleInit() {
    this.explore();
  }

  explore() {
    const agenda = this.modRef.get(Agenda);
    const providers = this.discoveryService.getProviders();
    for (const provider of providers) {
      if (!provider.instance) continue;
      if (!provider.metatype) continue;
      if (!this.metadataAccessor.canProcessJobs(provider.metatype)) continue;
      if (!provider.isDependencyTreeStatic()) continue;

      this.metadataScanner.scanFromPrototype(
        provider.instance,
        Object.getPrototypeOf(provider.instance),
        (key: string) => {
          const methodRef = provider.instance[key];
          if (typeof methodRef !== "function") return;

          const defineOptions =
            this.metadataAccessor.getJobDefinitionOptions(methodRef);
          if (!defineOptions) return;
          this.logger.log(`Defining job "${defineOptions.name}"`);
          const processor = (...args: unknown[]) =>
            methodRef.call(provider.instance, ...args);
          agenda.define(
            defineOptions.name,
            defineOptions.options || {},
            processor,
          );

          const scheduleOptions =
            this.metadataAccessor.getJobScheduleOptions(methodRef);
          if (!scheduleOptions) return;

          if (!scheduleOptions.when)
            throw new Error("Expected `when` to be defined");
          if (
            typeof scheduleOptions.when !== "string" &&
            !(scheduleOptions.when instanceof Date)
          )
            throw new Error("Expected `when` to be a string or Date");
          if (
            scheduleOptions.isEvery &&
            typeof scheduleOptions.when !== "string"
          )
            throw new Error(
              "Expected `when` to be a string when `isEvery` is true",
            );

          this.logger.log(
            `Scheduling job "${defineOptions.name}" to run ${
              scheduleOptions.isEvery
                ? `every ${scheduleOptions.when}`
                : scheduleOptions.when instanceof Date
                ? `at ${scheduleOptions.when.toISOString()}`
                : scheduleOptions.when
            }`,
          );

          if (scheduleOptions.isEvery) {
            agenda.every(scheduleOptions.when as string, defineOptions.name);
          } else {
            agenda.schedule(scheduleOptions.when, defineOptions.name, {});
          }
        },
      );
    }
  }
}
