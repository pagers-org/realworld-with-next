import Head from 'next/head';
import { NavLink } from '@/components';
import { withAuth } from '@/hoc';
import { LoginForm } from '@/templates/profile';

const Login = () => (
  <>
    <Head>
      <title>LOGIN | NEXT REAL-WORLD</title>
      <meta
        name="description"
        content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)"
      />
    </Head>
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <NavLink href="/user/register">Need an account?</NavLink>
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Login;

export const getServerSideProps = withAuth(async () => ({
  props: {},
}));
