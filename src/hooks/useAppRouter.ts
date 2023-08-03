import { useRouter } from 'next/router';
import useDevice from '@/hooks/useDevice';
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
  appScreenName?: string;
  appSendData?: Record<string, unknown>;
}

const BASE_URL = process.env.NEXT_PUBLIC_WEB_DOAMIN!;

const sendRouterEvent = async (params: Record<string, string | Record<string, unknown>>) => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ROUTER_EVENT', ...params }));
};

const useAppRouter = () => {
  const { isWebView } = useDevice();
  const router = useRouter();

  const push = async (
    url: string,
    as?: Url,
    options: TransitionOptions = { shallow: true },
  ): Promise<void | boolean> => {
    return isWebView
      ? sendRouterEvent({
          path: `${BASE_URL}${url}`,
          screenName: options.appScreenName ?? '',
          data: { ...(options.appSendData ?? {}) },
        })
      : router.push(url, as, options);
  };

  const replace = async (
    url: string,
    as?: Url,
    options: TransitionOptions = { shallow: true },
  ): Promise<void | boolean> => {
    return isWebView
      ? sendRouterEvent({
          path: `${BASE_URL}${url}`,
          screenName: options.appScreenName ?? '',
          data: { ...(options.appSendData ?? {}) },
        })
      : router.replace(url, as, options);
  };

  const reload = async (): Promise<void> =>
    isWebView ? sendRouterEvent({ type: 'ROUTER_REFRESH' }) : router.reload();

  const back = async (): Promise<void> =>
    isWebView ? sendRouterEvent({ type: 'ROUTER_BACK' }) : router.back();

  return {
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
