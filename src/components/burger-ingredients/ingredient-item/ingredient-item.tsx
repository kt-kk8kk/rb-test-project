import React from 'react';
import styles from './ingredient-item.module.css';
import { TIngredient } from '@utils/types.ts';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientItemProps = {
	ingredient: TIngredient;
	onClick: (ingredient: TIngredient) => void;
};

export const IngredientItem = ({
	ingredient,
	onClick,
}: TIngredientItemProps): React.JSX.Element => {
	return (
		<li className={`${styles.item} mb-10`}>
			<button className={styles.item_btn} onClick={() => onClick(ingredient)}>
				<Counter count={1} size='default' />
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
					<span className={'text_type_digits-default'}>{ingredient.price}</span>
					<CurrencyIcon type='primary' />
				</div>
				<div className={'text text_type_main-default pb-6'}>
					{ingredient.name}
				</div>
			</button>
		</li>
	);
};
