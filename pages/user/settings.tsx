import Router from 'next/router';

import useSWR, { mutate } from 'swr';

import SettingsForm from '../../components/profile/SettingsForm';
import checkLogin from '../../lib/utils/checkLogin';
import storage from '../../lib/utils/storage';

const Settings = ({ res }) => {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  if (!isLoggedIn) {
    if (res) {
      res.writeHead(302, {
        Location: '/',
      });
      res.end();
    }
    Router.push(`/`);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    await mutate('user', null);
    Router.push(`/`).then(() => mutate('user'));
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingsForm />
            <hr />
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.getInitialProps = async ({ res }) => {
  return {
    res,
  };
};

export default Settings;
