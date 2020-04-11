import React, { useContext } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Avatar, Box, Button } from '@material-ui/core';

import { AuthContext } from '../context/Auth';
import firebaseConfig from '../firebase';

const uiConfig = {
	signInFlow: 'popup',
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const OAuthLoginButton = () => {
	const { currentUser } = useContext(AuthContext);
	const isSignedIn = !!currentUser;

	return isSignedIn ? (
		<Box
			display="flex"
			justifyContent="flex-end"
			alignItems="center"
			width={'235px'}
		>
			<Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
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
