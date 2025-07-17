import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/use-redux-hooks';
import { Preloader } from '@components/preloader/preloader';
import { ErrorMessage } from '@components/error-message/error-message';
import { OrderInfo } from '@components/feed-orders/order-info/order-info';
import { historyConnect, historyDisconnect } from '@services/actions/history';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredient, TOrder } from '@utils/types';
import { HISTORY_WS_URL } from '@utils/constants';

export type THistOrderIngredient = Pick<
	TIngredient,
	'_id' | 'name' | 'image' | 'price'
> & {
	quantity: number;
};

export const HistoryOrderInfoWrapper = (): React.JSX.Element | null => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	const { orders, loading, error } = useAppSelector((s) => s.history);
	const byId = useAppSelector((state) => state.ingredients.byId);

	const order = useMemo<TOrder | undefined>(
		() => orders.find((o) => o._id === id || String(o.number) === id),
		[orders, id]
	);

	const ingredientsList = useMemo<THistOrderIngredient[]>(() => {
		if (!order) return [];
		const counts: Record<string, number> = {};
		for (const ingId of order.ingredients) {
			counts[ingId] = (counts[ingId] || 0) + 1;
		}
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
			.filter((x): x is THistOrderIngredient => Boolean(x));
	}, [order, byId]);

	const total = useMemo<number>(() => {
		if (!order) return 0;
		return order.ingredients.reduce((sum, ingId) => {
			const ing = byId[ingId];
			return ing ? sum + ing.price : sum;
		}, 0);
	}, [order, byId]);

	useEffect(() => {
		dispatch(historyConnect(HISTORY_WS_URL));
		return () => {
			dispatch(historyDisconnect());
		};
	}, [dispatch]);

	if (loading) return <Preloader />;
	if (error) return <ErrorMessage error={error} />;
	if (!order)
		return <p className='text text_type_main-medium'>Заказ не найден</p>;

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
