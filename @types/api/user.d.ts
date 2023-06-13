declare module 'types-api/user' {
  import type { RWClientNonParamCall, RWClientParamCall } from 'types-client';
  import type { User, Profile, Articles } from 'types-domain';

  type UserAPITypes = {
    login: RWClientParamCall<{ email: string; password: string }, { user: User }>;

    setToken: RWClientParamCall<{ user: User }>;

    removeToken: RWClientNonParamCall;

    register: RWClientParamCall<
      { username: string; email: string; password: string },
      { user: User }
    >;

    save: RWClientParamCall<{ user: User }, { user: User }>;

    follow: RWClientParamCall<{ username: string }, { user: User }>;

    unfollow: RWClientParamCall<{ username: string }, { user: User }>;

    get: RWClientParamCall<{ username: string }, { profile: Profile }>;

    getArticles: RWClientParamCall<{ username: string; offset: number }, Articles>;
  };
}
