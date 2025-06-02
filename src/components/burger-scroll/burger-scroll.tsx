import React, { ReactNode, RefObject } from 'react';
import styles from './burger-scroll.module.css';

type TBurgerScrollProps = {
	children: ReactNode;
	scrollRef?: RefObject<HTMLDivElement>;
};

export const BurgerScroll = ({
	children,
	scrollRef,
}: TBurgerScrollProps): React.JSX.Element => {
	return (
		<div ref={scrollRef} className={`${styles.scroll} custom-scroll`}>
			{children}
		</div>
	);
};
