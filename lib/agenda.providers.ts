import type { FactoryProvider } from "@nestjs/common";
import Agenda from "agenda";
import type { AgendaModuleOptions } from "./types";
import { AGENDA_MODULE_OPTIONS_TOKEN } from "./agenda.constants";

export const createClientProvider = (): FactoryProvider => ({
  provide: Agenda,
  useFactory: async (options: AgendaModuleOptions) => {
    const agenda = new Agenda(options);
    await agenda.start();
    return agenda;
  },
  inject: [AGENDA_MODULE_OPTIONS_TOKEN],
});
