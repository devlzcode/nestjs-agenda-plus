import { SetMetadata } from "@nestjs/common";
import type { DefineOptions } from "agenda";
import { AGENDA_DEFINE_JOB_METADATA } from "../agenda.constants";

export const DefineJob = (name: string, options?: DefineOptions) =>
  SetMetadata(AGENDA_DEFINE_JOB_METADATA, { name, options });
