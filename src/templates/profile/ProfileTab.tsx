import { memo } from 'react';
import { NavLink } from '@/components';
import type { Profile } from 'types-domain';

const ProfileTab = (props: Profile) => (
  <ul className="nav nav-pills outline-active">
    <li className="nav-item">
      <NavLink href={`/profile/${props.username}`}>
        <span>My Articles</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink href={`/profile/${props.username}?favorite=true`}>
        <span>Favorited Articles</span>
      </NavLink>
    </li>
  </ul>
);

export default memo(ProfileTab);
