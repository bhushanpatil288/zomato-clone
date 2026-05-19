import { Outlet } from 'react-router';
import { Footer, Navbar } from './components';

const Layout = () => {

  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
