import { NavLink } from '@/components';
import { useUser } from '@/stores';

type TabListProps = {
  tag: string;
};

const TabList = ({ tag }: TabListProps) => {
  const { token, username } = useUser();

  if (!token) {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink href="/">Global Feed</NavLink>
        </li>

        {tag && (
          <li className="nav-item">
            <NavLink href={`/?tag=${tag}`} className="nav-link active">
              <i className="ion-pound" /> {tag}
            </NavLink>
          </li>
        )}
      </ul>
    );
  }

  return (
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <NavLink href={`/?follow=${username}`}>Your Feed</NavLink>
      </li>

      <li className="nav-item">
        <NavLink href="/">Global Feed</NavLink>
      </li>

      {tag && (
        <li className="nav-item">
          <NavLink href={`/?tag=${tag}`} className="nav-link active">
            <i className="ion-pound" /> {tag}
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default TabList;
