import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { Avatar, Box, Button } from '@material-ui/core';
import firebaseConfig from '../firebase';
import useUser from '../hooks/useUser';

const uiConfig = {
	signInFlow: 'popup',
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const OAuthLoginButton = () => {
	const user = useUser();

	const isSignedIn = !!user;

	return isSignedIn ? (
		<Box
			display="flex"
			justifyContent="flex-end"
			alignItems="center"
			width={'235px'}
		>
			<Avatar alt={user.displayName} src={user.photoURL} />
			<Button
				variant="contained"
				onClick={() => firebaseConfig.auth().signOut()}
				style={{ marginLeft: '24px' }}
			>
				Sign Out
			</Button>
		</Box>
	) : (
		<StyledFirebaseAuth
			uiConfig={uiConfig}
			firebaseAuth={firebaseConfig.auth()}
		/>
	);
};

export default OAuthLoginButton;
