import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      This is Outlet
      <p>
        <Outlet />
      </p>
    </div>
  );
};

export default Layout;
