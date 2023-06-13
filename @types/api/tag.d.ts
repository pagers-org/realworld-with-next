declare module 'types-api/tag' {
  import type { RWClientNonParamCall } from 'types-client';

  type TagAPITypes = {
    getAll: RWClientNonParamCall<{ tags: string[] }>;
  };
}
