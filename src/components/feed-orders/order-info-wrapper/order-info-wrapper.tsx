import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { Preloader } from '@components/preloader/preloader';
import { ErrorMessage } from '@components/error-message/error-message';
import { OrderInfo } from '../order-info/order-info';
import { feedConnect, feedDisconnect } from '@services/actions/feed';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredient, TOrder } from '@utils/types';
import { FEED_WS_URL } from '@utils/constants';

export type TOrderInfoIngredient = Pick<
	TIngredient,
	'_id' | 'name' | 'image' | 'price'
> & {
	quantity: number;
};

export const OrderInfoWrapper = (): React.JSX.Element | null => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	const { orders, loading, error } = useAppSelector((s) => s.feed);
	const byId = useAppSelector((s) => s.ingredients.byId);

	useEffect(() => {
		dispatch(feedConnect(FEED_WS_URL));
		return () => {
			dispatch(feedDisconnect());
		};
	}, [dispatch]);

	const order = useMemo<TOrder | undefined>(
		() => orders.find((o) => o._id === id || String(o.number) === id),
		[orders, id]
	);

	const ingredientsList = useMemo<TOrderInfoIngredient[]>(() => {
		if (!order) return [];
		const counts: Record<string, number> = {};
		order.ingredients.forEach((ingId) => {
			counts[ingId] = (counts[ingId] || 0) + 1;
		});
		return Object.entries(counts)
			.map(([ingId, qty]) => {
				const ing = byId[ingId];
				if (!ing) return null;
				return {
					_id: ing._id,
					name: ing.name,
					image: ing.image,
					price: ing.price,
					quantity: qty,
				};
			})
			.filter((x): x is TOrderInfoIngredient => Boolean(x));
	}, [order, byId]);

	const total = useMemo<number>(() => {
		if (!order) return 0;
		return order.ingredients.reduce((sum, ingId) => {
			const ing = byId[ingId];
			return ing ? sum + ing.price : sum;
		}, 0);
	}, [order, byId]);

	if (loading) {
		return <Preloader />;
	}
	if (error) {
		return <ErrorMessage error={error} />;
	}
	if (!order) {
		return <p className='text text_type_main-medium'>Заказ не найден</p>;
	}

	return (
		<OrderInfo
			title={order.name}
			status={order.status}
			number={order.number}
			date={<FormattedDate date={new Date(order.createdAt)} />}
			total={total}
			ingredients={ingredientsList}
		/>
	);
};
