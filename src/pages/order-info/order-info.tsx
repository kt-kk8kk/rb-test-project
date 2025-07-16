import React from 'react';
import styles from './order-info.module.css';
import { OrderInfoWrapper } from '@components/feed-orders/order-info-wrapper/order-info-wrapper';

export const OrderInfoPage = (): React.JSX.Element => {
	return (
		<div className={styles.order_info_page}>
			<OrderInfoWrapper />
		</div>
	);
};
