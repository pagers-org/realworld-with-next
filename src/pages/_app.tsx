import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {
  type DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Footer, Navbar } from '@/components';
import { 리액트_쿼리_기본값 } from '@/constants';
import { GlobalStoreProvider } from '@/contexts';
import '@/styles/styles.css';
import type { GlobalStoreInterface } from 'types-store';

type AppGlobalProps = {
  dehydratedState: DehydratedState;
  initialZustandState: GlobalStoreInterface;
};

if (typeof window !== 'undefined') {
  require('lazysizes/plugins/attrchange/ls.attrchange.js');
  require('lazysizes/plugins/respimg/ls.respimg.js');
  require('lazysizes');
} else {
  React.useLayoutEffect = React.useEffect;
}

const RealWorldApp = ({ Component, pageProps }: AppProps<AppGlobalProps>) => {
  const [queryClient] = React.useState(() => new QueryClient(리액트_쿼리_기본값));

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <GlobalStoreProvider {...pageProps.initialZustandState}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </Hydrate>
        </QueryClientProvider>
      </GlobalStoreProvider>
    </>
  );
};

export default RealWorldApp;
