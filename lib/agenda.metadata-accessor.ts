import { Reflector } from "@nestjs/core";
import { Inject, Injectable } from "@nestjs/common";
import {
  AGENDA_MODULE_OPTIONS_TOKEN,
  AGENDA_DEFINE_JOB_METADATA,
  AGENDA_SCHEDULE_JOB_METADATA,
  AGENDA_PROCESSOR_METADATA,
} from "./agenda.constants";
import type {
  AgendaModuleOptions,
  JobDefinitionOptions,
  JobScheduleOptions,
} from "./types";

@Injectable()
export class AgendaMetadataAccessor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AGENDA_MODULE_OPTIONS_TOKEN)
    private readonly options: AgendaModuleOptions,
  ) {}

  public canProcessJobs(target: Function) {
    if (!this.options.processorOnly) return true;
    return this.reflector.get<boolean | undefined>(
      AGENDA_PROCESSOR_METADATA,
      target,
    );
  }

  public getJobDefinitionOptions(target: Function) {
    return this.reflector.get<JobDefinitionOptions | undefined>(
      AGENDA_DEFINE_JOB_METADATA,
      target,
    );
  }

  public getJobScheduleOptions(target: Function) {
    return this.reflector.get<JobScheduleOptions | undefined>(
      AGENDA_SCHEDULE_JOB_METADATA,
      target,
    );
  }
}
