import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '@utils/types';
import { ORDER_STATUS_TEXT } from '@utils/constants';

type TOrderItemIngredient = Pick<TIngredient, '_id' | 'name' | 'image'>;

type TOrderItemProps = {
	title: string;
	status: 'done' | 'pending' | 'created';
	number: number;
	date: React.ReactNode;
	total: number;
	ingredients: TOrderItemIngredient[];
	to: string;
	showStatus?: boolean;
};

export const OrderItem = ({
	title,
	status,
	number,
	date,
	total,
	ingredients,
	to,
	showStatus = false,
}: TOrderItemProps): React.JSX.Element => {
	const location = useLocation();
	const statusText = ORDER_STATUS_TEXT[status];
	const statusClass = status === 'done' ? styles.done : '';

	return (
		<div className={`${styles.order_item} mb-6`}>
			<Link
				to={to}
				state={{ background: location }}
				className={styles.order_link}>
				<div className={`${styles.order_item_header} mb-6`}>
					<span className='text text_type_digits-default'>
						#{number}
					</span>
					<span className='text text_type_main-default text_color_inactive'>
						{date}
					</span>
				</div>
				<h2 className='text text_type_main-medium mb-6'>
					{title}
					{showStatus && (
						<span
							className={`${styles.order_status} ${statusClass} text text_type_main-default mt-2`}>
							{statusText}
						</span>
					)}
				</h2>
				<div className={styles.order_item_body}>
					<ul className={`${styles.order_item_ingredients} text`}>
						{ingredients.slice(0, 6).map((item, index) => (
							<li
								key={`${item._id}-${index}`}
								style={{ zIndex: 10 - index }}>
								<div
									className={
										styles.ingredient_gradient_border
									}>
									<div
										className={
											styles.ingredient_inner_content
										}>
										<img
											className={styles.ingredient_image}
											src={item.image}
											alt={item.name}
										/>
										{index === 5 &&
											ingredients.length > 6 && (
												<span
													className={`${styles.ingredient_overlay} text text_type_main-default`}>
													+{ingredients.length - 6}
												</span>
											)}
									</div>
								</div>
							</li>
						))}
					</ul>
					<div className={styles.order_item_total}>
						<span className='text text_type_digits-default'>
							{total}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</Link>
		</div>
	);
};
