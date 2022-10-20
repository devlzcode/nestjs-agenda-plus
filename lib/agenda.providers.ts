import { FactoryProvider, Logger } from "@nestjs/common";
import { Agenda } from "@hokify/agenda";
import type { AgendaModuleOptions } from "./types";
import { AGENDA_MODULE_OPTIONS_TOKEN } from "./agenda.constants";

const logger = new Logger("AgendaModule");

export const createClientProvider = (): FactoryProvider => ({
  provide: Agenda,
  useFactory: async (options: AgendaModuleOptions) => {
    const agenda = new Agenda(options);
    agenda.on("fail", (err, job) =>
      logger.error(`Job ${job.attrs.name} failed: ${err.message}`, err.stack),
    );
    agenda.on("error", (err) => logger.error(err));
    await agenda.start();
    logger.log("Agenda started");
    return agenda;
  },
  inject: [AGENDA_MODULE_OPTIONS_TOKEN],
});
