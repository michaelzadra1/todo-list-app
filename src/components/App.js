import 'typeface-roboto';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from '../context/Auth';
import Header from './Header';
import CallToAction from './CallToAction';
import ToDoSearch from './ToDoSearch';

const App = () => {
	return (
		<AuthProvider>
			<CssBaseline />
			<Header />
			<CallToAction />
			<ToDoSearch />
		</AuthProvider>
	);
};

export default App;
