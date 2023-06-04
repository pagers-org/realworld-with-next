import { createContext, type Dispatch, type PropsWithChildren, useContext, useState } from 'react';

export type PageCountDispatch = Dispatch<any>;

const PageCountStateContext = createContext<number | null>(null);

const PageCountDispatchContext = createContext<PageCountDispatch | undefined>(undefined);

const PageCountContextProvider = ({ children }: PropsWithChildren) => {
  const [pageCount, setPageCount] = useState(1);
  return (
    <PageCountDispatchContext.Provider value={setPageCount}>
      <PageCountStateContext.Provider value={pageCount}>{children}</PageCountStateContext.Provider>
    </PageCountDispatchContext.Provider>
  );
};

export const usePageCountState = () => {
  const state = useContext(PageCountStateContext);
  return state;
};

export const usePageCountDispatch = () => {
  const dispatch = useContext(PageCountDispatchContext);
  return dispatch;
};

export default PageCountContextProvider;
