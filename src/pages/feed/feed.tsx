import React, { useEffect } from 'react';
import { useAppDispatch } from '@hooks/use-redux-hooks';
import { feedConnect, feedDisconnect } from '@services/actions/feed';
import { FeedOrders } from '@components/feed-orders/feed-orders';
import { StatsOrders } from '@components/stats-orders/stats-orders';
import { FEED_WS_URL } from '@utils/constants';

export const FeedPage = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(feedConnect(FEED_WS_URL));
		return () => {
			dispatch(feedDisconnect());
		};
	}, [dispatch]);

	return (
		<>
			<FeedOrders />
			<StatsOrders />
		</>
	);
};
