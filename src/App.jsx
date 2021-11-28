import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from '@apollo/client';
import { Users } from 'pages/usuarios/user';
import './styles/tables.css';
import { UserEdit } from 'pages/usuarios/userEdit';


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
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}
export default App;
