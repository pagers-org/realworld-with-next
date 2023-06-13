import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';

const EditProfileButton = () => {
  const router = useRouter();

  const handleSettingsClick = useCallback(
    () => router.push('/user/settings', undefined, { shallow: true }),
    [],
  );

  return (
    <div onClick={handleSettingsClick} className="btn btn-sm btn-outline-secondary action-btn">
      <i className="ion-gear-a" /> Edit Profile Settings
    </div>
  );
};

export default memo(EditProfileButton);
