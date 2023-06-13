import Head from 'next/head';
import { NavLink } from '@/components';
import { RegisterForm } from '@/templates/profile';

const RegisterPage = () => (
  <>
    <Head>
      <title>REGISTER | NEXT REAL-WORLD</title>
      <meta name="description" content="Please register before login" />
    </Head>
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <NavLink href="/user/login">Have an account?</NavLink>
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RegisterPage;
