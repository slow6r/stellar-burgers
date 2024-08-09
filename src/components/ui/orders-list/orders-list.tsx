import { FC } from 'react';
import { Preloader } from '@ui';
import { useSelector } from '../../../services/store';
import { getIsOrderLoading } from '../../../services/slices/profileOrdersSlice';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  const isLoading: boolean = useSelector(getIsOrderLoading);
  if (isLoading) {
    return (
      <div className={`${styles.content}`}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={`${styles.content}`}>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </div>
  );
};
