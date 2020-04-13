import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
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
					<Box display="flex" alignItems="center">
						<PlaylistAddCheckIcon style={{ marginRight: '8px' }} />
						<Typography component={'h1'}>To-Do</Typography>
					</Box>
					<OAuthLoginButton />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
