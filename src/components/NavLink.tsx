import { type PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import useAppRouter from '@/hooks/useAppRouter';

type NavLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

const NavLink = ({ className, href, children }: NavLinkProps) => {
  const router = useAppRouter();

  const $className = useMemo(
    () => className || `nav-link${router.asPath === href ? ` active` : ''}`,
    [className, router.asPath, href],
  );

  return (
    <Link
      className={$className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
