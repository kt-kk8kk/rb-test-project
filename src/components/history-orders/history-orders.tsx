import React from 'react';
import { useAppSelector } from '@hooks/use-redux-hooks';
import { OrderItem } from '@components/feed-orders/order-item/order-item';
import { TOrder } from '@utils/types';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { ColScroll } from '../col-scroll/col-scroll';

export const HistoryOrders = (): React.JSX.Element => {
	const { orders } = useAppSelector((state) => state.history);
	const byId = useAppSelector((state) => state.ingredients.byId);

	const getOrderPrice = (order: TOrder): number =>
		order.ingredients.reduce((sum, id) => {
			const ing = byId[id];
			return ing ? sum + ing.price : sum;
		}, 0);

	const displayOrders = [...orders].reverse();

	return (
		<ColScroll>
			<section className='pr-4'>
				{displayOrders.map((order: TOrder) => (
					<OrderItem
						key={order._id}
						to={`/profile/orders/${order._id}`}
						number={order.number}
						date={
							<FormattedDate date={new Date(order.createdAt)} />
						}
						title={order.name}
						status={order.status}
						total={getOrderPrice(order)}
						ingredients={order.ingredients.map((id) => {
							const ing = byId[id];
							return ing
								? {
										_id: ing._id,
										name: ing.name,
										image: ing.image,
									}
								: { _id: id, name: '', image: '' };
						})}
						showStatus={true}
					/>
				))}
			</section>
		</ColScroll>
	);
};
