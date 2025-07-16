import React, { ReactNode } from 'react';
import styles from './stats-group.module.css';

type TStatsGroupProps = {
	children: ReactNode;
};

export const StatsGroup = ({
	children,
}: TStatsGroupProps): React.JSX.Element => {
	return <div className={`${styles.stats_group}`}>{children}</div>;
};
