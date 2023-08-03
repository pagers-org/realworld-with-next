import { createStore, useStore as useZustandStore } from 'zustand';
import { combine } from 'zustand/middleware';
import { createContext, useContext } from 'react';
import { 유저_스토리지_기본값 } from '@/constants';
import type { GlobalStoreInterface } from 'types-store';

export type InitializeStoreReturnType = ReturnType<typeof initializeStore>;

const getDefaultInitialState = () => ({
  user: { ...유저_스토리지_기본값 },
});

export const initializeStore = (preloadedState: Partial<GlobalStoreInterface> = {}) =>
  createStore<GlobalStoreInterface, [['zustand/persist', { id: string }]]>(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set) => ({
      setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
    })),
  );

const GlobalStoreContext = createContext<InitializeStoreReturnType | null>(null);

export const Provider = GlobalStoreContext.Provider;

export const useStore = <T>(selector: (state: GlobalStoreInterface) => T) => {
  const store = useContext(GlobalStoreContext);
  if (!store) throw new Error('Store is missing the provider');

  return useZustandStore(store, selector);
};

export const useUser = () => {
  return useStore((state) => state.user);
};
