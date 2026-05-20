import { BrowserRouter, Routes, Route } from 'react-router';
import {
  DashboardPage,
  HomePage,
  LoginPage,
  SignupPage,
} from './pages';

import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/authThunk';
import { getToken } from './redux/authStorage';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.dark);

  useEffect(() => {
    if (getToken()) {
      dispatch(getMe());
    }
  }, [dispatch]);

  // Apply dark mode globally to the HTML element
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

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
