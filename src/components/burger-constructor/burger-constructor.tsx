import React, { useState, useMemo, useEffect } from 'react';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerScroll } from '../burger-scroll/burger-scroll';
import { ConstructorTotalSumm } from './constructor-total-summ/constructor-total-summ';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';
import { DraggableIngredient } from './draggable-ingredient/draggable-ingredient';
import { ConstructorPlaceholder } from './constructor-placeholder/constructor-placeholder';
import { TIngredient } from '@utils/types.ts';
import Graphics from '../../images/graphics.png';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { store, RootState } from '@services/store';
import { addIngredient } from '@/services/slices/burger-constructor-slice';
import { createOrderThunk, clearOrder } from '@/services/slices/order-slice';

export type AppDispatch = typeof store.dispatch;

export const BurgerConstructor = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();

	const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
	const ingredients = useSelector(
		(state: RootState) => state.burgerConstructor.ingredients
	);
	const fillings = (ingredients ?? []).filter((item) => item.type !== 'bun');

	const [highlightTopBottom, setHighlightTopBottom] = useState(false);
	const [highlightFillings, setHighlightFillings] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const orderNumber = useSelector(
		(state: RootState) => state.order.orderNumber
	);
	const loading = useSelector((state: RootState) => state.order.loading);
	const error = useSelector((state: RootState) => state.order.error);

	const [{ isOver, draggedType }, dropRef] = useDrop<
		TIngredient,
		void,
		{ isOver: boolean; draggedType: string | null }
	>({
		accept: ['bun', 'ingredient'],
		collect: (monitor) => ({
			isOver: monitor.isOver({ shallow: true }),
			draggedType: monitor.getItem()?.type ?? null,
		}),
		drop: (item: TIngredient) => {
			dispatch(addIngredient(item));
		},
	});

	const totalPrice = useMemo(() => {
		const bunPrice = bun ? bun.price * 2 : 0;
		const fillingsPrice = ingredients.reduce(
			(sum, item) => sum + item.price,
			0
		);
		return bunPrice + fillingsPrice;
	}, [bun, ingredients]);

	const handleOrder = async () => {
		if (!bun) {
			alert('Пожалуйста, выберите булку');
			return;
		}

		const ingredientIds = [bun._id, ...fillings.map((i) => i._id), bun._id];

		try {
			await dispatch(createOrderThunk(ingredientIds)).unwrap();
			setIsModalOpen(true);
		} catch (error) {
			alert('Ошибка при оформлении заказа');
		}
	};

	useEffect(() => {
		if (isOver && draggedType === 'bun') {
			setHighlightTopBottom(true);
			setHighlightFillings(false);
		} else if (isOver && draggedType && draggedType !== 'bun') {
			setHighlightFillings(fillings.length === 0);
			setHighlightTopBottom(false);
		} else {
			setHighlightTopBottom(false);
			setHighlightFillings(false);
		}
	}, [isOver, draggedType, fillings.length]);

	return (
		<section className={styles.burger_constructor}>
			<div className={styles.drop_zone} ref={dropRef}>
				<div className='mb-4 pl-8'>
					{bun ? (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					) : (
						<ConstructorPlaceholder
							type='булки'
							data-position='top'
							className={
								highlightTopBottom
									? styles.highlight
									: undefined
							}
						/>
					)}
				</div>

				<BurgerScroll>
					<ul className={styles.fillings}>
						{fillings.length > 0 ? (
							fillings.map((item, index) => (
								<DraggableIngredient
									key={item.uuid}
									ingredient={item}
									index={index}
								/>
							))
						) : (
							<li className={'pl-8'}>
								<ConstructorPlaceholder
									type='начинку'
									className={
										highlightFillings
											? styles.highlight
											: undefined
									}
								/>
							</li>
						)}
					</ul>
				</BurgerScroll>

				<div className='mt-4 pl-8'>
					{bun ? (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					) : (
						<ConstructorPlaceholder
							type='булки'
							data-position='bottom'
							className={
								highlightTopBottom
									? styles.highlight
									: undefined
							}
						/>
					)}
				</div>
			</div>

			<footer className={`${styles.constructor_footer} mt-10`}>
				<ConstructorTotalSumm total={totalPrice} />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleOrder}
					disabled={loading}>
					{loading ? 'Оформление...' : 'Оформить заказ'}
				</Button>
			</footer>

			{isModalOpen && (
				<Modal
					onClose={() => {
						setIsModalOpen(false);
						dispatch(clearOrder());
					}}>
					{error ? (
						<div className='text text_type_main-medium text_color_error'>
							Ошибка: {error}
						</div>
					) : (
						<OrderDetails
							digits={orderNumber ?? 0}
							src={Graphics}
							copy={'Ваш заказ начали готовить'}
							add={'Дождитесь готовности на орбитальной станции'}
						/>
					)}
				</Modal>
			)}
		</section>
	);
};
