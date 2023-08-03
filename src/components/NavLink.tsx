import { type MouseEvent, type PropsWithChildren } from 'react';
import useAppRouter from '@/hooks/useAppRouter';

type NavLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

const NavLink = ({ className, href, children }: NavLinkProps) => {
  const { push, asPath } = useAppRouter();

  const $className = className || `nav-link${asPath === href ? ` active` : ''}`;
  const handleRouteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();

    void push(href, undefined, { shallow: false });
  };

  return (
    <span className={$className} onClick={handleRouteClick}>
      {children}
    </span>
  );
};

export default NavLink;
