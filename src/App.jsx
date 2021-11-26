import './App.css';
import { Index } from './pages/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Contact } from './pages/Contact';
import { User } from './graphql/users/user';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	HttpLink,
} from '@apollo/client';


const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'https://backen-mercury.herokuapp.com/graphql',
	}),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/contact" element={<Contact />} />

					{/* Users Routes */}
					<Route path="/users" element={<User />} />
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}
export default App;
