import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import OAuthLoginButton from './OAuthLoginButton';

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					width={'100%'}
					height={'72px'}
				>
					<Typography component={'h1'}>To-Do Application</Typography>
					<OAuthLoginButton />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
