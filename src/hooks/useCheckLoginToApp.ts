import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { 리얼_월드_키, 유저_스토리지_기본값 } from '@/constants';
import type { User } from 'types-domain';

const useCheckLoginToApp = () => {
  useEffect(() => {
    if (typeof window?.ReactNativeWebView === 'undefined') {
      return;
    }

    const stringValue = getCookie(리얼_월드_키) ?? JSON.stringify(유저_스토리지_기본값);
    const user = JSON.parse(`${stringValue}`) as User;
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: 'USER_AUTH', token: user.token.length > 0 ? user.token : null }),
    );
  }, []);
};

export default useCheckLoginToApp;
