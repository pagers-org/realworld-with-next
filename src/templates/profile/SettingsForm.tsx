import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import UserAPI from '@/api/core/user';
import { ErrorList } from '@/components';
import { useUser } from '@/stores';
import type { RWClientError } from 'types-client';
import type { User } from 'types-domain';

type UserInfo = User & {
  password?: string;
};

const SettingsForm = () => {
  const currentUser = useUser();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RWClientError['errors']['body']>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    password: '',
    ...currentUser,
  });

  const updateState =
    (field: keyof UserInfo) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newState = { ...userInfo, [field]: event.target.value };
      setUserInfo(newState);
    };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser.token) return;

    try {
      setLoading(true);

      const { email, token, username, bio, image } = userInfo;
      const { user } = await UserAPI.save(
        { user: { email, token, username, bio, image } },
        currentUser.token,
      );

      setLoading(false);

      if (!user) return;
      await router.push(`/`, undefined, { shallow: true }).then(() => UserAPI.setToken({ user }));
    } catch (error) {
      const $error = error as RWClientError;
      setErrors($error.errors.body);
    }
  };

  return (
    <>
      <ErrorList errors={errors} />
      <form onSubmit={submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={userInfo.image}
              onChange={updateState('image')}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={userInfo.username}
              onChange={updateState('username')}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={userInfo.bio || ''}
              onChange={updateState('bio')}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={updateState('email')}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={userInfo.password}
              onChange={updateState('password')}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default SettingsForm;
