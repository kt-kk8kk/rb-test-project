import React from 'react';
import styles from './ingredient-item.module.css';
import { TIngredient } from '@utils/types.ts';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

type TIngredientItemProps = {
	ingredient: TIngredient;
	count?: number;
};

export const IngredientItem = ({
	ingredient,
	count = 0,
}: TIngredientItemProps): React.JSX.Element => {
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const location = useLocation();
	const ingredientId = ingredient._id;

	return (
		<li
			ref={dragRef}
			className={`${styles.item} mb-10`}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<Link
				to={`/ingredients/${ingredientId}`}
				state={{ background: location }}
				className={styles.item_btn}>
				{count > 0 && <Counter count={count} size='default' />}
				<div className={`${styles.img_wrap} mb-1`}>
					<img
						className={styles.img}
						src={ingredient.image_large}
						width='240'
						height='120'
						alt={ingredient.name}
					/>
				</div>
				<div className={`${styles.price_wrap} mb-2`}>
					<span className={'text_type_digits-default'}>
						{ingredient.price}
					</span>
					<CurrencyIcon type='primary' />
				</div>
				<div className={'text text_type_main-default pb-6'}>
					{ingredient.name}
				</div>
			</Link>
		</li>
	);
};
