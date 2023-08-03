import UserAPI from '@/api/core/user';
import useAppRouter from '@/hooks/useAppRouter';
import useDevice from '@/hooks/useDevice';

const useLogout = () => {
  const { isWebView } = useDevice();
  const { replace, reload } = useAppRouter();

  return () => {
    UserAPI.removeToken().then(() => {
      if (isWebView) {
        void reload();
        return;
      }

      void replace('/', undefined, { shallow: true });
    });
  };
};

export default useLogout;
