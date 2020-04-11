import { useEffect, useState } from 'react';
import firebaseConfig from '../firebase';

const useUser = () => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		firebaseConfig.auth().onAuthStateChanged(setCurrentUser);
	}, []);

	return currentUser;
};

export default useUser;
