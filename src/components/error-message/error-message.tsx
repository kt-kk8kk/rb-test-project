import React from 'react';
import styles from './error-message.module.css';

type TErrorMessageProps = {
	error: string;
};

export const ErrorMessage = ({
	error,
}: TErrorMessageProps): React.JSX.Element => {
	return (
		<div className={`${styles.form_errors} mt-4`}>
			<span className='text text_type_main-small'>{error}</span>
		</div>
	);
};
