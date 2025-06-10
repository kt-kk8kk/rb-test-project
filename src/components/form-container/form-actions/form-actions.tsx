import React, { ReactNode } from 'react';
import styles from './form-actions.module.css';

type TFormActionsProps = {
	children: ReactNode;
};

export const FormActions = ({
	children,
}: TFormActionsProps): React.JSX.Element => {
	return <div className={`${styles.form_actions} pb-9`}>{children}</div>;
};
