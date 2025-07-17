import React from 'react';
import { useAppSelector } from '@hooks/use-redux-hooks';
import styles from './feed-orders.module.css';
import { ColScroll } from '../col-scroll/col-scroll';
import { OrdersGroup } from './orders-group/orders-group';
import { OrderItem } from './order-item/order-item';
import { TOrder } from '@utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export const FeedOrders = (): React.JSX.Element => {
	const orders = useAppSelector((state) => state.feed.orders);
	const byId = useAppSelector((state) => state.ingredients.byId);

	const getOrderPrice = (order: TOrder): number => {
		return order.ingredients.reduce((total: number, id: string) => {
			const ingredient = byId[id];
			return ingredient ? total + ingredient.price : total;
		}, 0);
	};

	return (
		<section className={styles.feed_orders}>
			<ColScroll>
				<OrdersGroup>
					{orders.map((order: TOrder) => (
						<OrderItem
							key={order._id}
							number={order.number}
							date={
								<FormattedDate
									date={new Date(order.createdAt)}
								/>
							}
							title={order.name}
							status={order.status}
							total={getOrderPrice(order)}
							ingredients={order.ingredients.map((id: string) => {
								const found = byId[id];
								return {
									_id: id,
									name: found?.name || '',
									image: found?.image || '',
								};
							})}
							to={`/feed/${order._id}`}
						/>
					))}
				</OrdersGroup>
			</ColScroll>
		</section>
	);
};
