import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/use-redux-hooks';
import styles from './stats-board.module.css';
import type { TOrder } from '@utils/types';

type TStatsBoardProps = {
	title: string;
	status: 'done' | 'pending';
};

export const StatsBoard = ({
	title,
	status,
}: TStatsBoardProps): React.JSX.Element => {
	const location = useLocation();
	const orders = useAppSelector((state) => state.feed.orders) as TOrder[];

	const filteredOrders = orders
		.filter((order) => order.status === status)
		.slice(0, 10);

	return (
		<div className={styles.stats_board}>
			<h3 className='text text_type_main-medium mb-4'>{title}</h3>
			<ul className={styles.stats_board_list}>
				{filteredOrders.map((order) => (
					<li
						key={order._id}
						className='text text_type_digits-default pt-2'>
						<Link
							to={`/feed/${order._id}`}
							state={{ background: location }}
							className={`${styles.stats_board_link} ${status === 'done' ? styles.done : styles.pending}`}>
							{order.number}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
