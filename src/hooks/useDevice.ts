import { useEffect, useState } from 'react';

type WindowSize = {
  width?: number;
  height?: number;
};

const MAX_MOBILE_SIZE = 992;

const useWebview = () => {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    setIsWebView(typeof window !== 'undefined' && Boolean(window.ReactNativeWebView));
  }, []);

  return {
    isWebView,
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
