import { type FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import UserAPI from '@/api/core/user';
import { ErrorList } from '@/components';
import type { RWClientError } from 'types-client';

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RWClientError['errors']['body']>([]);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const $target = event.target as HTMLFormElement;
    const username = $target.elements['input-username'].value;
    const email = $target.elements['input-email'].value;
    const password = $target.elements['input-password'].value;

    try {
      const { user } = await UserAPI.register({ username, email, password });
      await router.push('/', undefined, { shallow: true }).then(() => UserAPI.setToken({ user }));
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
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              name="input-username"
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              name="input-email"
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              name="input-password"
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Sign up
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default RegisterForm;
