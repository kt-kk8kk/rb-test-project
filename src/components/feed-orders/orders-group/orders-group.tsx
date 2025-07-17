import React, { ReactNode } from 'react';

type TOrdersGroupProps = {
	children: ReactNode;
};

export const OrdersGroup = ({
	children,
}: TOrdersGroupProps): React.JSX.Element => {
	return <div className='pl-2 pr-4'>{children}</div>;
};
