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
import { login, resetError } from '@services/slices/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/use-form';

export type TLoginRequest = {
	email: string;
	password: string;
};

export const LoginPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error } = useSelector((state: RootState) => state.user);

	const { values, handleChange, setValues } = useForm<TLoginRequest>({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const from =
		(location.state as { from?: Location })?.from?.pathname || ROUTES.HOME;

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
		setTimeout(() => passwordRef.current?.focus(), 0);
	};

	useEffect(() => {
		dispatch(resetError());
	}, [dispatch]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login({ email: values.email, password: values.password }))
			.unwrap()
			.then(() => {
				navigate(from, { replace: true });
				setValues({ email: '', password: '' });
			})
			.catch((err) => {
				console.error('Ошибка входа:', err);
			});
	};

	return (
		<FormContainer title='Вход' onSubmit={handleSubmit}>
			<Input
				type={'email'}
				placeholder={'E-mail'}
				name={'email'}
				value={values.email}
				onChange={handleChange}
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
				value={values.password}
				onChange={handleChange}
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
					{isLoading ? 'Вход...' : 'Войти'}
				</Button>
				{error && <ErrorMessage error={error} />}
			</FormActions>
			<FormHint
				text='Вы — новый пользователь?'
				linkText='Зарегистрироваться'
				linkTo={ROUTES.REGISTER}
			/>
			<FormHint
				text='Забыли пароль?'
				linkText='Восстановить пароль'
				linkTo={ROUTES.FORGOT_PASSWORD}
			/>
		</FormContainer>
	);
};
