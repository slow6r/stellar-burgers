import { FC, useMemo } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  getOrders,
  getTotalOrders,
  getTotalTodayOrders
} from '../../services/slices/profileOrdersSlice';

const getOrdersData = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  const feed = {
    total: useSelector(getTotalOrders),
    totalToday: useSelector(getTotalTodayOrders)
  };

  const readyOrders = useMemo(() => getOrdersData(orders, 'done'), [orders]);
  const pendingOrders = useMemo(
    () => getOrdersData(orders, 'pending'),
    [orders]
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
