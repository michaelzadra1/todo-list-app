import 'typeface-roboto';
import React from 'react';
import { AuthProvider } from '../context/Auth';
import Header from './Header';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
	return (
		<AuthProvider>
			<CssBaseline />
			<Header />
		</AuthProvider>
	);
};

export default App;
