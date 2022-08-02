import type { DefineOptions } from "agenda";

export type JobDefinitionOptions = {
  name: string;
  options?: DefineOptions;
};

export type JobScheduleOptions = {
  when: Date | string;
  isEvery?: boolean;
};
