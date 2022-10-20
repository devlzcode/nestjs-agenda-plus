import type { IJobDefinition } from "@hokify/agenda";
import { JobPriority } from "@hokify/agenda/dist/utils/priority";

export type JobOptions = Partial<
  Pick<IJobDefinition, "lockLimit" | "lockLifetime" | "concurrency">
> & {
  priority?: JobPriority;
};

export type JobDefinitionOptions = {
  name: string;
  options?: JobOptions;
};

export type JobScheduleOptions = {
  when: Date | string;
  isEvery?: boolean;
};
