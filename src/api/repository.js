import firebaseConfig from '../firebase';

export const createToDo = async (userId, toDo) => {
	const db = firebaseConfig.firestore();
	const ref = db.collection('users').doc(userId).collection('todos').doc();
	return db
		.collection('users')
		.doc(userId)
		.collection('todos')
		.doc(ref.id)
		.set({ ...toDo, id: ref.id });
};

export const fetchToDos = async (userId) => {
	const db = firebaseConfig.firestore();
	return db.collection('users').doc(userId).collection('todos').get();
};
