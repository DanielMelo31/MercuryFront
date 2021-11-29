import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from '@apollo/client';
import { Users } from 'pages/usuarios/user';
import './styles/tables.css';
import './styles/defaultInputs.css';
import './styles/globals.css';
import { UserEdit } from 'pages/usuarios/userEdit';
import { AuthLayout } from 'layouts/AuthLayout';
import { Register } from 'pages/auth/register';
import { Login } from 'pages/auth/login';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:8080/graphql',
	}),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes>
					{/* Users Routes */}
					<Route path="/users" element={<Users />} />
					<Route path="/users/edit/:id" element={<UserEdit />} />
					<Route path="/auth" element={<AuthLayout />}>
						<Route path="register" element={<Register />} />
						<Route path="login" element={<Login />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}
export default App;
