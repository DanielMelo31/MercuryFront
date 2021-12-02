import { Navigate, Outlet } from 'react-router';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/AuthContext';
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from 'graphql/usuario/mutation';
import { useNavigate } from 'react-router';
import Sidebar from 'componets/SideBar';

const PrivateLayout = () => {
	const navigate = useNavigate();
	const { authToken, setToken, loadingAuth } = useAuth();
	const [
		refreshToken,
		{ data: mutationData, loading: mutationLoading, error: errorMutation },
	] = useMutation(REFRESH_TOKEN);

	useEffect(() => {
		refreshToken();
	}, []);

	//Set token value
	useEffect(() => {
		console.log('Data', mutationData);
		if (mutationData) {
			if (mutationData.refreshToken.token) {
				setToken(mutationData.refreshToken.token);
			} else {
				setToken(null);
			}
		}
	}, [mutationData, setToken]);

	useEffect(() => {
		console.log('current token:', authToken);
	}, [authToken]);

	if (authToken === null) {
		navigate('auth/login');
		console.log('policia');
	}

	return (
		<div className="flex flex-col md:flex-row flex-no-wrap h-screen">
			<Sidebar />
			<div className="flex w-full h-full">
				<div className="w-full h-full  overflow-y-scroll">
					<Outlet />
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default PrivateLayout;
