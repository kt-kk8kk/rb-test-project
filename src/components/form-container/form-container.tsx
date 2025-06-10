import React, { ReactNode, FormEventHandler, FormHTMLAttributes } from 'react';
import styles from './form-container.module.css';

type TFormContainerProps = {
	title?: string;
	children: ReactNode;
	onSubmit?: FormEventHandler<HTMLFormElement>;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export const FormContainer = ({
	title,
	children,
	onSubmit,
	...formProps
}: TFormContainerProps): React.JSX.Element => {
	return (
		<div className={`${styles.form_container} ${title ? 'pt-15' : ''}`}>
			{title && (
				<h2
					className={`${styles.form_title} text text_type_main-medium mb-6`}>
					{title}
				</h2>
			)}
			<form onSubmit={onSubmit} {...formProps}>
				{children}
			</form>
		</div>
	);
};
