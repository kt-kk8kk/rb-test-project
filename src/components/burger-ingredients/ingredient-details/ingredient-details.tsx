import React from 'react';
import styles from './ingredient-details.module.css';
import { TIngredient } from '@utils/types.ts';

type TBurgerIngredientsProps = {
	ingredient: TIngredient;
};

export const IngredientDetails = ({
	ingredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<div className={styles.ingredient_details}>
			<div className={`${styles.img_wrap} mb-4`}>
				<img
					className={styles.img}
					src={ingredient.image_large}
					width='480'
					height='240'
					alt={ingredient.name}
				/>
			</div>
			<h4 className={'text text_type_main-medium mb-8'}>
				{ingredient.name}
			</h4>
			<ul
				className={`${styles.ingredient_nutrition} text text_color_inactive mb-5`}>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Калории,ккал
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.calories}
					</span>
				</li>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Белки,г
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.proteins}
					</span>
				</li>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Жиры,г
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.fat}
					</span>
				</li>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Углеводы,г
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.carbohydrates}
					</span>
				</li>
			</ul>
		</div>
	);
};
