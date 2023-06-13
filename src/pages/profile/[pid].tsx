import { useMemo } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { useFollowUser, useGetProfile, usePreFetchGetProfile, useUnFollowUser } from '@/api/user';
import { CustomImage, ErrorMessage } from '@/components';
import { 프로필_기본값 } from '@/constants';
import { withAuth } from '@/hoc';
import { useUser } from '@/stores';
import { ArticleList } from '@/templates/article';
import { EditProfileButton, FollowUserButton, ProfileTab } from '@/templates/profile';

type ProfileProps = {
  favorite: string;
  pid: string;
  follow: string;
  slug: string;
  tag: string;
};

const Profile = (props: ProfileProps) => {
  const { token, username: storedUsername } = useUser();
  const { mutate: followUser } = useFollowUser(props.pid);
  const { mutate: unFollowUser } = useUnFollowUser(props.pid);
  const { data = { profile: 프로필_기본값 } } = useGetProfile(props.pid);
  const { username, bio, image, following } = data.profile;

  const isMe = useMemo(
    () => Boolean(token && username === storedUsername),
    [storedUsername, token, username],
  );

  if (!data.profile) return <ErrorMessage message="Can't load profile" />;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <CustomImage src={image} alt="User's profile image" className="user-img" />
              <h4>{username}</h4>
              <p>{bio}</p>
              {isMe && <EditProfileButton />}
              {token && isMe && (
                <FollowUserButton
                  username={username}
                  following={following}
                  follow={followUser}
                  unfollow={unFollowUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ProfileTab {...data.profile} />
            </div>
            <ArticleList {...props} isProfilePage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = withAuth(async ({ query, initialZustandState }) => {
  const pid = query.pid as string;
  const queryClient = await usePreFetchGetProfile(pid);

  return {
    props: {
      favorite: query.favorite ?? '',
      follow: query.follow ?? '',
      tag: query.tag ?? '',
      pid,
      initialZustandState,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
