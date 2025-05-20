import React, { ReactNode } from 'react';
import styles from './burger-scroll.module.css';

type TBurgerScrollProps = {
	children: ReactNode;
};

export const BurgerScroll = ({
	children,
}: TBurgerScrollProps): React.JSX.Element => {
	return <div className={`${styles.scroll} custom-scroll`}>{children}</div>;
};
