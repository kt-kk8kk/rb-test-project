import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@services/store';
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { MainLayout } from '@components/main-layout/main-layout';
import { HomePage } from '@pages/home/home';
import { NotFound404 } from '@pages/not-found-404/not-found-404';
import { LoginPage } from '@pages/login/login';
import { RegisterPage } from '@pages/register/register';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '@pages/reset-password/reset-password';
import { ProfileLayout } from '@components/profile-layout/profile-layout';
import { ProfilePage } from '@pages/profile/profile';
import { ProfileOrdersPage } from '@pages/profile-orders/profile-orders';
import { IngredientDetailsPage } from '@pages/ingredient-details/ingredient-details';
import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { ROUTES } from '@utils/routes';
import { OnlyAuth, OnlyUnAuth } from '@/components/protected-route';
import { fetchUser } from '@services/slices/user-slice';

function AppRoutes() {
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleModalClose = () => navigate(-1);

	return (
		<>
			<Routes location={background || location}>
				<Route element={<MainLayout />}>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route
						path={ROUTES.INGREDIENT}
						element={<IngredientDetailsPage />}
					/>
					<Route
						path={ROUTES.LOGIN}
						element={<OnlyUnAuth component={<LoginPage />} />}
					/>
					<Route
						path={ROUTES.REGISTER}
						element={<OnlyUnAuth component={<RegisterPage />} />}
					/>
					<Route
						path={ROUTES.FORGOT_PASSWORD}
						element={
							<OnlyUnAuth component={<ForgotPasswordPage />} />
						}
					/>
					<Route
						path={ROUTES.RESET_PASSWORD}
						element={
							<OnlyUnAuth component={<ResetPasswordPage />} />
						}
					/>

					<Route
						path={ROUTES.PROFILE}
						element={<OnlyAuth component={<ProfileLayout />} />}>
						<Route index element={<ProfilePage />} />
						<Route
							path={ROUTES.PROFILE_ORDERS}
							element={<ProfileOrdersPage />}
						/>
					</Route>
				</Route>
				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path={ROUTES.INGREDIENT}
						element={
							<Modal
								title='Детали ингредиента'
								onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
}

export const App = (): React.JSX.Element => (
	<BrowserRouter>
		<AppRoutes />
	</BrowserRouter>
);
