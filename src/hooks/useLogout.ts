import { useCallback } from 'react';
import { useRouter } from 'next/router';
import UserAPI from '@/api/core/user';
import { useStore } from '@/stores';

const useLogout = () => {
  const router = useRouter();
  const resetUser = useStore((state) => state.reset);

  return useCallback(() => {
    router.push('/', undefined, { shallow: true }).then(() => {
      resetUser();
      UserAPI.removeToken();
    });
  }, []);
};

export default useLogout;
