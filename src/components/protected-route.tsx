import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '@services/slices/user-slice';
import { ROUTES } from '@utils/routes';

interface ProtectedProps {
	onlyUnAuth?: boolean;
	component: ReactElement;
}

const Protected: React.FC<ProtectedProps> = ({
	onlyUnAuth = false,
	component,
}) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <p>Loading...</p>;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } =
			(location.state as { from?: { pathname: string } }) ?? {};
		const redirectTo = from?.pathname || '/';
		return <Navigate to={redirectTo} />;
	}

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: React.FC<{ component: ReactElement }> = ({
	component,
}) => <Protected onlyUnAuth={true} component={component} />;
