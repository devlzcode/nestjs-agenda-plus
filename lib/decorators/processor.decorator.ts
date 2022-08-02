import { SCOPE_OPTIONS_METADATA } from "@nestjs/common/constants";
import type { ScopeOptions } from "@nestjs/common";
import { SetMetadata, applyDecorators } from "@nestjs/common";
import { AGENDA_PROCESSOR_METADATA } from "../agenda.constants";

export const Processor = (scopeOptions?: ScopeOptions) =>
  applyDecorators(
    SetMetadata(AGENDA_PROCESSOR_METADATA, true),
    SetMetadata(SCOPE_OPTIONS_METADATA, scopeOptions),
  );
