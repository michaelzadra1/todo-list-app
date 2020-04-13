import React, { useContext } from 'react';
import { Container, Typography, Box } from '@material-ui/core';

import { AuthContext } from '../context/Auth';

const CallToAction = () => {
	const d = new Date();
	const dayOfTheWeek = d.toLocaleString('en-us', {
		weekday: 'long'
	});

	const { isSignedIn } = useContext(AuthContext);

	return (
		<Container maxWidth="sm">
			<Box my={3}>
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="textPrimary"
				>
					Welcome to To-Do
				</Typography>
				<Typography
					component="h2"
					variant="h5"
					align="center"
					color="textSecondary"
				>
					{`Happy ${dayOfTheWeek}! ${
						isSignedIn ? 'Manage your To-Dos Below' : 'Please sign In'
					}`}
				</Typography>
			</Box>
		</Container>
	);
};

export default CallToAction;
