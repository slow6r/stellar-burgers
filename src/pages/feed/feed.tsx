import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  loadAllOrders,
  getIsOrderLoading
} from '../../services/slices/profileOrdersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsOrderLoading);
  const orders = useSelector(getOrders);

  useEffect(() => {
    dispatch(loadAllOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(loadAllOrders());
      }}
    />
  );
};
