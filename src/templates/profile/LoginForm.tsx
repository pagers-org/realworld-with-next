import { type FormEvent, useCallback, useState } from 'react';
import UserAPI from '@/api/core/user';
import { ErrorList } from '@/components';
import useAppRouter from '@/hooks/useAppRouter';
import { useStore } from '@/stores';
import type { RWClientError } from 'types-client';

const LoginForm = () => {
  const router = useAppRouter();
  const setUser = useStore((state) => state.setUser);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RWClientError['errors']['body']>([]);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const $target = event.target as HTMLFormElement;
    const email = $target.elements['input-email'].value;
    const password = $target.elements['input-password'].value;

    try {
      const { user } = await UserAPI.login({ email, password });

      await router.push('/', undefined, { shallow: true }).then(() => {
        setUser(user);
        UserAPI.setToken({ user });
      });
    } catch (error) {
      const $error = error as RWClientError;
      setErrors($error.errors.body);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <ErrorList errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              name="input-email"
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              required
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              name="input-password"
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              required
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Sign in
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default LoginForm;
