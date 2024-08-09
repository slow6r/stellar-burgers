import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  ProfileOrders,
  Register,
  ResetPassword,
  Profile,
  NotFound404
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/burgerIngredientSlice';
import { checkUserAuth } from '../../services/slices/authorizationSlice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backgroundLocation = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/profile'>
          <Route index element={<OnlyAuth element={<Profile />} />} />
          <Route path='orders'>
            <Route index element={<ProfileOrders />} />
            <Route path='orders/:number' element={<OrderInfo />} />
          </Route>
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/login' element={<OnlyUnAuth element={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth element={<ResetPassword />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={handleModalClose} title={'Детали заказа:'}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={handleModalClose} title={'Детали ингридиента:'}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={handleModalClose} title={'Детали заказа:'}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
