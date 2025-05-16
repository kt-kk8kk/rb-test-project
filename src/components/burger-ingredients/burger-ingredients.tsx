import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerScroll } from '../burger-scroll/burger-scroll';
import { IngredientsGroupTitle } from './ingredients-group-title/ingredients-group-title';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { IngredientItem } from './ingredient-item/ingredient-item';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const buns = ingredients.filter((item) => item.type === 'bun');
	const sauces = ingredients.filter((item) => item.type === 'sauce');
	const main = ingredients.filter((item) => item.type === 'main');

	const [selectedIngredient, setSelectedIngredient] =
		useState<TIngredient | null>(null);

	return (
		<section className={styles.burger_ingredients}>
			<nav className={'pb-10'}>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
				</ul>
			</nav>

			<BurgerScroll>
				<IngredientsGroupTitle title={'Булки'} />
				<IngredientsGroup>
					{buns.map((item) => (
						<IngredientItem
							key={item._id}
							ingredient={item}
							onClick={setSelectedIngredient}
						/>
					))}
				</IngredientsGroup>

				<IngredientsGroupTitle title={'Соусы'} />
				<IngredientsGroup>
					{sauces.map((item) => (
						<IngredientItem
							key={item._id}
							ingredient={item}
							onClick={setSelectedIngredient}
						/>
					))}
				</IngredientsGroup>

				<IngredientsGroupTitle title={'Начинки'} />
				<IngredientsGroup>
					{main.map((item) => (
						<IngredientItem
							key={item._id}
							ingredient={item}
							onClick={setSelectedIngredient}
						/>
					))}
				</IngredientsGroup>
			</BurgerScroll>

			{selectedIngredient && (
				<Modal
					title='Детали ингредиента'
					onClose={() => setSelectedIngredient(null)}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</section>
	);
};
