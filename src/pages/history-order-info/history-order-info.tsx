import React from 'react';
import styles from './history-order-info.module.css';
import { HistoryOrderInfoWrapper } from '@components/history-order-info-wrapper/history-order-info-wrapper';

export const HistoryOrderInfoPage = (): React.JSX.Element => {
	return (
		<div className={styles.order_info_page}>
			<HistoryOrderInfoWrapper />
		</div>
	);
};
