import { useCallback } from 'react';

type FollowUserButtonProps = {
  following: boolean;
  username: string;
  follow: () => void;
  unfollow: () => void;
};

const FollowUserButton = ({ following, username, follow, unfollow }: FollowUserButtonProps) => {
  const handleClick = useCallback(() => {
    following ? unfollow() : follow();
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`btn btn-sm action-btn ${following ? 'btn-secondary' : 'btn-outline-secondary'}`}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowUserButton;
