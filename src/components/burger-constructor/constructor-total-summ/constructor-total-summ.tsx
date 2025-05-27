import React from 'react';
import styles from './constructor-total-summ.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TConstructorTotalSummProps = {
	total: number;
};

export const ConstructorTotalSumm = ({
	total,
}: TConstructorTotalSummProps): React.JSX.Element => {
	return (
		<div className={styles.total}>
			<div className='text text_type_digits-medium'>{total}</div>
			<CurrencyIcon type='primary' />
		</div>
	);
};
