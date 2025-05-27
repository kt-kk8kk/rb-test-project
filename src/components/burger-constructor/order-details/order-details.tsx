import React from 'react';
import styles from './order-details.module.css';

type TOrderDetailsProps = {
	digits: number;
	src: string;
	copy: string;
	add: string;
};

export const OrderDetails = ({
	digits,
	src,
	copy,
	add,
}: TOrderDetailsProps): React.JSX.Element => {
	return (
		<div className={`${styles.order_details} pt-20 pb-20`}>
			<div className={'mb-15'}>
				<span className={`${styles.id} text_type_digits-large mb-8`}>
					{digits}
				</span>
				<span className={'text text_type_main-medium'}>
					идентификатор заказа
				</span>
			</div>
			<div className={'mb-15'}>
				<img src={src} width={107} height={102} alt={copy} />
			</div>
			<div className={'text_type_main-default mb-2'}>{copy}</div>
			<div className={'text_type_main-default text_color_inactive'}>
				{add}
			</div>
		</div>
	);
};
