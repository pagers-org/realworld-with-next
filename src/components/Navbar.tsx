import { useCallback } from 'react';
import useAppRouter from '@/hooks/useAppRouter';
import { useUser } from '@/stores';
import NavLink from './NavLink';

const Navbar = () => {
  const router = useAppRouter();
  const { token, username } = useUser();

  const handleRouteMain = useCallback(() => router.push('/', undefined, { shallow: true }), []);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <div className="navbar-brand cursor-pointer" onClick={handleRouteMain}>
          <span>conduit</span>
        </div>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink href="/">
              <span>Home</span>
            </NavLink>
          </li>

          {!token ? (
            <>
              <li className="nav-item">
                <NavLink href="/user/login">Sign in</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/user/register">Sign up</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink href="/editor/new">
                  <i className="ion-compose" />
                  &nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/user/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink href={`/profile/${username}`}>
                  <span>{username}</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
