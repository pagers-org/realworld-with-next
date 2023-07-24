import UserAPI from '@/api/core/user';
import useAppRouter from '@/hooks/useAppRouter';
import { useStore } from '@/stores';

const useLogout = () => {
  const router = useAppRouter();
  const resetUser = useStore((state) => state.reset);

  return () => {
    router.push('/', undefined, { shallow: true }).then(() => {
      resetUser();
      void UserAPI.removeToken();
    });
  };
};

export default useLogout;
