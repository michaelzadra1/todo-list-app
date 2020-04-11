import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
		<button onClick={() => firebaseConfig.auth().signOut()}>Log out</button>
	) : (
		<StyledFirebaseAuth
			uiConfig={uiConfig}
			firebaseAuth={firebaseConfig.auth()}
		/>
	);
};

export default OAuthLoginButton;
