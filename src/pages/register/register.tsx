import React, { useRef, useState, useEffect } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormContainer } from '@components/form-container/form-container';
import { FormHint } from '@components/form-container/form-hint/form-hint';
import { FormActions } from '@components/form-container/form-actions/form-actions';
import { ErrorMessage } from '@components/error-message/error-message';
import { ROUTES } from '@utils/routes';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@services/store';
import { register, resetError } from '@services/slices/user-slice';

export const RegisterPage = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error } = useSelector((state: RootState) => state.user);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
		setTimeout(() => passwordRef.current?.focus(), 0);
	};

	useEffect(() => {
		dispatch(resetError());
	}, [dispatch]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register({ name, email, password }));
	};

	return (
		<FormContainer title='Регистрация' onSubmit={handleSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				name={'name'}
				value={name || ''}
				onChange={(e) => setName(e.target.value)}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={nameRef}
			/>
			<Input
				type={'text'}
				placeholder={'E-mail'}
				name={'email'}
				value={email || ''}
				onChange={(e) => setEmail(e.target.value)}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={emailRef}
			/>
			<Input
				type={showPassword ? 'text' : 'password'}
				placeholder={'Пароль'}
				name={'password'}
				value={password || ''}
				onChange={(e) => setPassword(e.target.value)}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={passwordRef}
				icon={showPassword ? 'HideIcon' : 'ShowIcon'}
				onIconClick={togglePasswordVisibility}
			/>
			<FormActions>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={isLoading}>
					{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
				</Button>
				{error && <ErrorMessage error={error} />}
			</FormActions>
			<FormHint
				text='Уже зарегистрированы?'
				linkText='Войти'
				linkTo={ROUTES.LOGIN}
			/>
		</FormContainer>
	);
};
