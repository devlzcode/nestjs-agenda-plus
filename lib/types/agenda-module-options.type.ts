import type { ForkOptions } from "child_process";
import type {
  IDatabaseOptions,
  IMongoOptions,
  IDbConfig,
} from "@hokify/agenda";

export type AgendaConfig = {
  name?: string;
  defaultConcurrency?: number;
  processEvery?: string | number;
  maxConcurrency?: number;
  defaultLockLimit?: number;
  lockLimit?: number;
  defaultLockLifetime?: number;
} & (IDatabaseOptions | IMongoOptions | {}) &
  IDbConfig & {
    forkHelper?: {
      path: string;
      options?: ForkOptions;
    };
    forkedWorker?: boolean;
  };

export type AgendaModuleOptions = { processorOnly?: boolean } & AgendaConfig;
