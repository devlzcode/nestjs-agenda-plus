import { ConfigurableModuleBuilder } from "@nestjs/common";
import type { AgendaModuleOptions } from "./types";
import { AGENDA_MODULE_OPTIONS_TOKEN } from "./agenda.constants";
import { createClientProvider } from "./agenda.providers";

export const { ConfigurableModuleClass, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<AgendaModuleOptions>({
    moduleName: "Agenda",
    optionsInjectionToken: AGENDA_MODULE_OPTIONS_TOKEN,
  })
    .setClassMethodName("forRoot")
    .setFactoryMethodName("createAgendaOptions")
    .setExtras({}, (definition) => {
      const clientProvider = createClientProvider();
      definition.providers = [...(definition.providers || []), clientProvider];
      definition.exports = [clientProvider];
      return definition;
    })
    .build();
