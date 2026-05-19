import { BrowserRouter, Routes, Route } from 'react-router';
import { 
  DashboardPage,
  HomePage,
  LoginPage 
} from './pages';

import Layout from './Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
