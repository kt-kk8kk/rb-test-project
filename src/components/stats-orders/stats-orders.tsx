import React from 'react';
import { useAppSelector } from '@hooks/use-redux-hooks';
import styles from './stats-orders.module.css';
import { ColScroll } from '../col-scroll/col-scroll';
import { StatsGroup } from './stats-group/stats-group';
import { StatsBoard } from './stats-board/stats-board';
import { StatsCompleted } from './stats-completed/stats-completed';
import { RootState } from '@services/root-reducer';

export const StatsOrders = (): React.JSX.Element => {
	const { total, totalToday } = useAppSelector(
		(state: RootState) => state.feed
	);

	return (
		<section className={styles.stats_orders}>
			<ColScroll>
				<StatsGroup>
					<StatsBoard title='Готовы:' status='done' />
					<StatsBoard title='В работе:' status='pending' />
				</StatsGroup>
				<StatsGroup>
					<StatsCompleted
						title='Выполнено за все время:'
						total={total}
					/>
				</StatsGroup>
				<StatsGroup>
					<StatsCompleted
						title='Выполнено за сегодня:'
						total={totalToday}
					/>
				</StatsGroup>
			</ColScroll>
		</section>
	);
};
