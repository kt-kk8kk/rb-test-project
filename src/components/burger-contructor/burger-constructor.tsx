import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerScroll } from '../burger-scroll/burger-scroll';
import { ConstructorTotalSumm } from './constructor-total-summ/constructor-total-summ';
import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';
//import { TIngredient } from '@utils/types.ts';
import Graphics from '../../images/graphics.png';

import { useSelector } from 'react-redux';
import { RootState } from '@services/store';

// type TBurgerConstructorProps = {
// 	ingredients: TIngredient[];
// };

export const BurgerConstructor = (): React.JSX.Element => {
	// ⬇ получаем ингредиенты из Redux
	const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
	const ingredients = useSelector(
		(state: RootState) => state.burgerConstructor.ingredients
	);
	const fillings = (ingredients ?? []).filter((item) => item.type !== 'bun');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<section className={styles.burger_constructor}>
			{bun && (
				<div className={'mb-4 pl-8'}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}

			<BurgerScroll>
				<ul className={styles.fillings}>
					{fillings.map((item) => (
						<li key={item._id}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</li>
					))}
				</ul>
			</BurgerScroll>

			{bun && (
				<div className={'mt-4 pl-8'}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}

			<footer className={`${styles.constructor_footer} mt-10`}>
				<ConstructorTotalSumm total={610} />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleOpenModal}>
					Оформить заказ
				</Button>
			</footer>

			{isModalOpen && (
				<Modal onClose={handleCloseModal}>
					<OrderDetails
						digits={134536}
						src={Graphics}
						copy={'Ваш заказ начали готовить'}
						add={'Дождитесь готовности на орбитальной станции'}
					/>
				</Modal>
			)}
		</section>
	);
};
