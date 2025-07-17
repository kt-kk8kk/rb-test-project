import React, { ReactNode } from 'react';
import styles from './col-scroll.module.css';

type TColScrollProps = {
	children: ReactNode;
};

export const ColScroll = ({ children }: TColScrollProps): React.JSX.Element => {
	return <div className={`${styles.scroll} custom-scroll`}>{children}</div>;
};
