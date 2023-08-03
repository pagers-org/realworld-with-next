import { useEffect, useRef, useState } from 'react';

type WindowSize = {
  width?: number;
  height?: number;
};

const MAX_MOBILE_SIZE = 992;

const useWebview = () => {
  const isWebViewRef = useRef(false);

  useEffect(() => {
    if (isWebViewRef.current) return;

    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      isWebViewRef.current = true;
    }
  }, []);

  return {
    isWebView: isWebViewRef.current,
  };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowSize({ width, height });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const useDevice = () => {
  const { isWebView } = useWebview();
  const { width: windowWidth } = useWindowSize();
  const isMobile = !!windowWidth && windowWidth < MAX_MOBILE_SIZE;

  return { isWebView, isMobile };
};

export default useDevice;
