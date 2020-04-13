import firebaseConfig from '../firebase';
import { isEmpty } from 'lodash';

export const updateToDo = async (userId, toDo) => {
	const db = firebaseConfig.firestore();
	if (isEmpty(toDo.id)) {
		// We are creating a new to-do
		const ref = db.collection('users').doc(userId).collection('todos').doc();
		toDo.id = ref.id;
		toDo.timeStamp = new Date();
	}
	return db
		.collection('users')
		.doc(userId)
		.collection('todos')
		.doc(toDo.id)
		.set(toDo);
};

export const fetchToDos = async (userId) => {
	const db = firebaseConfig.firestore();
	return db
		.collection('users')
		.doc(userId)
		.collection('todos')
		.orderBy('timeStamp', 'desc')
		.get();
};
