import { SetMetadata } from "@nestjs/common";
import { AGENDA_SCHEDULE_JOB_METADATA } from "../agenda.constants";

export const ScheduleJob = (when: Date | string, isEvery?: boolean) =>
  SetMetadata(AGENDA_SCHEDULE_JOB_METADATA, { when, isEvery });
