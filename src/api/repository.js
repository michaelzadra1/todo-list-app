import firebaseConfig from '../firebase';

export const createToDo = async (userId, toDo) => {
	const db = firebaseConfig.firestore();
	return db.collection('users').doc(userId).collection('todos').add(toDo);
};

export const fetchToDos = async (userId) => {
	const db = firebaseConfig.firestore();
	return db.collection('users').doc(userId).collection('todos').get();
};
