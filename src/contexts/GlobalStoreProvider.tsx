import { type PropsWithChildren, useLayoutEffect, useRef } from 'react';
import { initializeStore, type InitializeStoreReturnType, Provider } from '@/stores';
import type { GlobalStoreInterface } from 'types-store';

const GlobalStoreProvider = ({ children, ...props }: PropsWithChildren<GlobalStoreInterface>) => {
  const storeRef = useRef<InitializeStoreReturnType | null>(null);

  storeRef.current = storeRef.current ?? initializeStore(props);

  useLayoutEffect(() => {
    if (Object.keys(props || {}).length > 0 && storeRef.current) {
      storeRef.current?.setState({ ...storeRef.current?.getState(), ...props }, true);
    }
  });

  return <Provider value={storeRef.current}>{children}</Provider>;
};

export default GlobalStoreProvider;
