import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'types-literal';

interface Url {
  auth: string | null;
  hash: string | null;
  host: string | null;
  hostname: string | null;
  href: string;
  path: string | null;
  pathname: string | null;
  protocol: string | null;
  search: string | null;
  slashes: boolean | null;
  port: string | null;
  query: string | null | ParsedUrlQuery;
}

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_WEB_DOAMIN!;

const sendRouterEvent = async (params: Record<string, string | Record<string, unknown>>) => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ROUTER_EVENT', ...params }));
};

const useAppRouter = () => {
  const router = useRouter();
  const [isApp, setIsApp] = useState(false);

  useLayoutEffect(() => {
    setIsApp(typeof window !== 'undefined' && window.ReactNativeWebView);
  }, []);

  const push = async (
    url: string,
    as?: Url,
    options: TransitionOptions = { shallow: true },
  ): Promise<void | boolean> => {
    return isApp
      ? sendRouterEvent({ path: `${BASE_URL}${url}`, data: {} })
      : router.push(url, as, options);
  };

  const replace = async (
    url: string,
    as?: Url,
    options: TransitionOptions = { shallow: true },
  ): Promise<void | boolean> => {
    return isApp ? sendRouterEvent({ path: url, data: {} }) : router.replace(url, as, options);
  };

  const reload = async (): Promise<void> =>
    isApp ? sendRouterEvent({ path: router.pathname, data: {} }) : router.reload();

  const back = async (): Promise<void> =>
    isApp ? sendRouterEvent({ path: 'back', data: {} }) : router.back();

  return {
    isApp,
    push,
    replace,
    reload,
    back,
    asPath: router.asPath,
    events: router.events,
    pathname: router.pathname,
    query: router.query,
  };
};

export default useAppRouter;
