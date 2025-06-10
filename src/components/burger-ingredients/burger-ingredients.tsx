import React, { useRef, useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerScroll } from '../burger-scroll/burger-scroll';
import { IngredientsGroupTitle } from './ingredients-group-title/ingredients-group-title';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { IngredientItem } from './ingredient-item/ingredient-item';
import { useSelector } from 'react-redux';
import { RootState } from '@services/store';

export const BurgerIngredients = (): React.JSX.Element => {
	const ingredients = useSelector(
		(state: RootState) => state.ingredients.items
	);

	const buns = ingredients.filter((item) => item.type === 'bun');
	const sauces = ingredients.filter((item) => item.type === 'sauce');
	const main = ingredients.filter((item) => item.type === 'main');

	const bunsRef = useRef<HTMLDivElement>(null);
	const saucesRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const scrollRef = useRef<HTMLDivElement>(null);

	const [currentTab, setCurrentTab] = useState<'bun' | 'sauce' | 'main'>(
		'bun'
	);

	const { bun, ingredients: constructorIngredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);

	const getCount = (ingredient: TIngredient): number => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0;
		}

		return constructorIngredients.filter(
			(item) => item._id === ingredient._id
		).length;
	};

	const handleScroll = () => {
		if (
			!scrollRef.current ||
			!bunsRef.current ||
			!saucesRef.current ||
			!mainRef.current
		)
			return;

		const containerTop = scrollRef.current.getBoundingClientRect().top;
		const tabOffset = 116;

		const adjustedTop = containerTop - tabOffset;

		const bunDistance = Math.abs(
			bunsRef.current.getBoundingClientRect().top - adjustedTop
		);
		const sauceDistance = Math.abs(
			saucesRef.current.getBoundingClientRect().top - adjustedTop
		);
		const mainDistance = Math.abs(
			mainRef.current.getBoundingClientRect().top - adjustedTop
		);

		const distances = [
			{ tab: 'bun', distance: bunDistance },
			{ tab: 'sauce', distance: sauceDistance },
			{ tab: 'main', distance: mainDistance },
		];

		const closest = distances.reduce((prev, curr) =>
			curr.distance < prev.distance ? curr : prev
		);

		setCurrentTab(closest.tab as 'bun' | 'sauce' | 'main');
	};

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		scrollContainer.addEventListener('scroll', handleScroll);

		return () => {
			scrollContainer.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<section className={styles.burger_ingredients}>
			<nav className={'pb-10'}>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={currentTab === 'bun'}
						onClick={() => {
							bunsRef.current?.scrollIntoView({
								behavior: 'smooth',
							});
							setCurrentTab('bun');
						}}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={currentTab === 'sauce'}
						onClick={() => {
							saucesRef.current?.scrollIntoView({
								behavior: 'smooth',
							});
							setCurrentTab('sauce');
						}}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={currentTab === 'main'}
						onClick={() => {
							mainRef.current?.scrollIntoView({
								behavior: 'smooth',
							});
							setCurrentTab('main');
						}}>
						Начинки
					</Tab>
				</ul>
			</nav>

			<BurgerScroll scrollRef={scrollRef}>
				<div ref={bunsRef}>
					<IngredientsGroupTitle title={'Булки'} />
					<IngredientsGroup>
						{buns.map((item) => (
							<IngredientItem
								key={item._id}
								ingredient={item}
								count={getCount(item)}
							/>
						))}
					</IngredientsGroup>
				</div>

				<div ref={saucesRef}>
					<IngredientsGroupTitle title={'Соусы'} />
					<IngredientsGroup>
						{sauces.map((item) => (
							<IngredientItem
								key={item._id}
								ingredient={item}
								count={getCount(item)}
							/>
						))}
					</IngredientsGroup>
				</div>

				<div ref={mainRef}>
					<IngredientsGroupTitle title={'Начинки'} />
					<IngredientsGroup>
						{main.map((item) => (
							<IngredientItem
								key={item._id}
								ingredient={item}
								count={getCount(item)}
							/>
						))}
					</IngredientsGroup>
				</div>
			</BurgerScroll>
		</section>
	);
};
