import React from 'react';
import styles from './stats-completed.module.css';

type TStatsCompletedProps = {
	title: string;
	total: number;
};

export const StatsCompleted = ({
	title,
	total,
}: TStatsCompletedProps): React.JSX.Element => {
	return (
		<div className={styles.stats_completed}>
			<h3 className='text text_type_main-medium'>{title}</h3>
			<div className='text text_type_digits-large'>{total}</div>
		</div>
	);
};
