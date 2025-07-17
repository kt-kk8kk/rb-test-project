import React, { useEffect } from 'react';
import { useAppDispatch } from '@hooks/use-redux-hooks';
import { historyConnect, historyDisconnect } from '@services/actions/history';
import { HistoryOrders } from '@components/history-orders/history-orders';
import { HISTORY_WS_URL } from '@utils/constants';

export const ProfileOrdersPage = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(historyConnect(HISTORY_WS_URL));
		return () => {
			dispatch(historyDisconnect());
		};
	}, [dispatch]);

	return <HistoryOrders />;
};
