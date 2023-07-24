import { memo, type MouseEvent, type PropsWithChildren, useMemo } from 'react';
import useAppRouter from '@/hooks/useAppRouter';

type NavLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

const NavLink = ({ className, href, children }: NavLinkProps) => {
  const { push, asPath } = useAppRouter();

  const $className = useMemo(
    () => className || `nav-link${asPath === href ? ` active` : ''}`,
    [className, asPath, href],
  );

  const handleRouteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    void push(href, undefined, { shallow: true });
  };

  return (
    <span className={$className} onClick={handleRouteClick}>
      {children}
    </span>
  );
};

export default memo(NavLink);
