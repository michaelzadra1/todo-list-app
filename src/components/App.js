import 'typeface-roboto';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from '../context/Auth';
import Header from './Header';
import CallToAction from './CallToAction';

const App = () => {
	return (
		<AuthProvider>
			<CssBaseline />
			<Header />
			<CallToAction />
		</AuthProvider>
	);
};

export default App;
