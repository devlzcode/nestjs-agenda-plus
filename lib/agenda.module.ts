import { Module, OnApplicationShutdown } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import Agenda from "agenda";
import { AgendaMetadataAccessor } from "./agenda.metadata-accessor";
import { AgendaExplorer } from "./agenda.explorer";
import { ConfigurableModuleClass } from "./agenda.module-definition";

@Module({
  imports: [DiscoveryModule],
  providers: [AgendaMetadataAccessor, AgendaExplorer],
})
export class AgendaModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  constructor(private readonly agenda: Agenda) {
    super();
  }

  async onApplicationShutdown() {
    await this.agenda.stop();
    await this.agenda.close();
  }
}
