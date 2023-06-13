import { withAuth } from '@/hoc';
import useLogout from '@/hooks/useLogout';
import { SettingsForm } from '@/templates/profile';

const SettingsPage = () => {
  const handleLogout = useLogout();

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

export default SettingsPage;

export const getServerSideProps = withAuth(async ({ initialZustandState }) => ({
  props: { initialZustandState },
}));
