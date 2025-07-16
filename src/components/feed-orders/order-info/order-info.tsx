import React from 'react';
import styles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '@utils/types';
import { ORDER_STATUS_TEXT } from '@utils/constants';

export type TOrderInfoIngredient = Pick<
	TIngredient,
	'_id' | 'name' | 'image' | 'price'
> & {
	quantity: number;
};

type TOrderInfoProps = {
	title: string;
	status: 'done' | 'pending' | 'created';
	number: number;
	date: React.ReactNode;
	total: number;
	ingredients: TOrderInfoIngredient[];
};

export const OrderInfo = ({
	title,
	status,
	number,
	date,
	total,
	ingredients,
}: TOrderInfoProps): React.JSX.Element => {
	const statusText = ORDER_STATUS_TEXT[status];
	const statusClass = status === 'done' ? styles.done : '';

	return (
		<div className={styles.order_info}>
			<div
				className={`${styles.order_info_number} text_type_digits-default mb-5`}>
				#{number}
			</div>
			<h2
				className={`${styles.order_info_title} text text_type_main-medium mb-15`}>
				{title}
				<span
					className={`${styles.order_info_status} ${statusClass} text text_type_main-default mt-2`}>
					{statusText}
				</span>
			</h2>
			<h3
				className={`${styles.order_info_title} text text_type_main-medium mb-6`}>
				Состав:
			</h3>
			<div className={`${styles.order_info_scroll} custom-scroll`}>
				<ul className={`${styles.order_info_ingredients} text pr-8`}>
					{ingredients.map((item, index) => (
						<li
							key={`${item._id}-${index}`}
							className={styles.ingredient_item}>
							<div className={styles.ingredient_gradient_border}>
								<div
									className={styles.ingredient_inner_content}>
									<img
										className={styles.ingredient_image}
										src={item.image}
										alt={item.name}
									/>
								</div>
							</div>
							<span className='text text_type_main-default'>
								{item.name}
							</span>
							<div className={styles.ingredient_price}>
								<span className='text_type_digits-default'>
									{item.quantity} × {item.price}
								</span>
								<CurrencyIcon type='primary' />
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className={`${styles.order_info_foot} pt-10 pr-8`}>
				<span className='text text_type_main-default text_color_inactive'>
					{date}
				</span>
				<div className={styles.order_info_total}>
					<span className='text text_type_digits-default'>
						{total}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
