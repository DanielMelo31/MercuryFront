import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	createHttpLink,
} from '@apollo/client';
import { Users } from 'pages/usuarios/user';
import './styles/tables.css';
import './styles/defaultInputs.css';
import './styles/globals.css';
import { UserEdit } from 'pages/usuarios/userEdit';
import { AuthLayout } from 'layouts/AuthLayout';
import { Register } from 'pages/auth/register';
import { Login } from 'pages/auth/login';
import { useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import PrivateLayout from 'layouts/PrivateLayout';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = JSON.parse(localStorage.getItem('token'));
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const httpLink = createHttpLink({
	uri: 'http://localhost:8080/graphql',
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	// link: new HttpLink({
	// 	uri: authLink.concat(httpLink),
	// }),
	link: authLink.concat(httpLink)
});

function App() {
	// const [userData, setUserData] = useState({});
	const [authToken, setAuthToken] = useState('');

	const setToken = (token) => {
		setAuthToken(token);
		if (token) {
			localStorage.setItem('token', JSON.stringify(token));
		} else {
			localStorage.removeItem('token')
		}
	};
	

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<PrivateLayout />}>
							{/* Users Routes */}
							<Route path="/users" element={<Users />} />
							<Route path="/users/edit/:id" element={<UserEdit />} />
						</Route>
						<Route path="/auth" element={<AuthLayout />}>
							<Route path="register" element={<Register />} />
							<Route path="login" element={<Login />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthContext.Provider>
		</ApolloProvider>
	);
}
export default App;
