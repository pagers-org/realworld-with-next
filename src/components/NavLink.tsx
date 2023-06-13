import { type PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

const NavLink = ({ className, href, children }: NavLinkProps) => {
  const router = useRouter();

  const $className = useMemo(
    () => className || `nav-link${router.asPath === href ? ` active` : ''}`,
    [className, router.asPath, href],
  );

  return (
    <Link className={$className} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;
