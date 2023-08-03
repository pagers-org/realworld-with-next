declare module 'types-literal' {
  type ParsedUrlQuery = { [p: string]: string | string[] | undefined };
}

declare module 'types-client' {
  type RWClientNonParamCall<R = unknown> = (token?: string) => Promise<R>;

  type RWClientParamCall<D extends Record<string, unknown>, R = unknown> = (
    data: D,
    token?: string,
  ) => Promise<R>;

  type RWClientError = {
    errors: {
      body: string[];
    };
  };
}

declare module 'types-store' {
  import type { User } from 'types-domain';

  type GlobalStoreInterface = {
    user: User;
    setUser: (newUser: User) => void;
  };
}
