import firebaseConfig from '../firebase';
import { isEmpty } from 'lodash';

export const updateToDo = async (userId, toDo) => {
	const db = firebaseConfig.firestore();
	let id;
	if (isEmpty(toDo.id)) {
		const ref = db.collection('users').doc(userId).collection('todos').doc();
		id = ref.id;
	} else {
		id = toDo.id;
	}
	return db
		.collection('users')
		.doc(userId)
		.collection('todos')
		.doc(id)
		.set({ ...toDo, id });
};

export const fetchToDos = async (userId) => {
	const db = firebaseConfig.firestore();
	return db.collection('users').doc(userId).collection('todos').get();
};
