import { SetMetadata } from "@nestjs/common";
import type { JobOptions } from "../types";
import { AGENDA_DEFINE_JOB_METADATA } from "../agenda.constants";

export const DefineJob = (name: string, options?: JobOptions) =>
  SetMetadata(AGENDA_DEFINE_JOB_METADATA, { name, options });
