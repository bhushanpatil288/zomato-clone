import { BrowserRouter, Routes, Route } from 'react-router';
import {
  DashboardPage,
  HomePage,
  LoginPage,
  SignupPage,
} from './pages';

import Layout from './Layout';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/authThunk';
import { getToken } from './redux/authStorage';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getToken()) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
