import { getCookie } from 'cookies-next';
import type { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';
import { 리얼_월드_키, 유저_스토리지_기본값 } from '@/constants';
import { initializeStore } from '@/stores';
import type { User } from 'types-domain';
import type { ParsedUrlQuery } from 'types-literal';
import type { GlobalStoreInterface } from 'types-store';

export interface AuthServerSidePropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> extends GetServerSidePropsContext<Q, D> {
  isSsrMobile: boolean;
  initialZustandState: GlobalStoreInterface;
}

export type AuthGetServerSideProps<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (context: AuthServerSidePropsContext<Q, D>) => Promise<GetServerSidePropsResult<P>>;

const withAuth =
  <T extends { [key: string]: unknown }>(getServerSideProps: AuthGetServerSideProps<T>) =>
  async (context: AuthServerSidePropsContext) => {
    const { req, res } = context;
    const zustandStore = initializeStore();

    const stringValue =
      getCookie(리얼_월드_키, { req, res }) ?? JSON.stringify(유저_스토리지_기본값);

    const user = JSON.parse(`${stringValue}`) as User;
    zustandStore.setState((prevState) => ({
      ...prevState,
      user,
    }));

    context.initialZustandState = JSON.parse(JSON.stringify(zustandStore.getState()));

    return await getServerSideProps(context);
  };

export default withAuth;
