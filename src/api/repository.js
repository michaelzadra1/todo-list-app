import firebaseConfig from '../firebase';
import { isEmpty, union, words } from 'lodash';

const getDbRef = (userId) => {
	const db = firebaseConfig.firestore();
	const ref = db.collection('users').doc(userId).collection('todos');
	return ref;
};

const getTagsSearchObject = (tags) => {
	const tagMap = {};
	tags.forEach((tag) => {
		tagMap[`${tag}`] = true;
	});
	return tagMap;
};

// Firebase 'set' methods handles both creation and edit of a document
export const updateToDo = async (userId, toDo) => {
	const dbRef = getDbRef(userId);
	const searchTerms = union(words(toDo.title), words(toDo.description));
	const tagSearchTerms = getTagsSearchObject(toDo.tags);

	toDo.searchTerms = searchTerms;
	toDo.tagsSearchTerms = tagSearchTerms;

	if (isEmpty(toDo.id)) {
		// We are creating a new to-do
		const ref = dbRef.doc();
		toDo.id = ref.id;
		toDo.timeStamp = new Date();
	}
	return dbRef.doc(toDo.id).set(toDo);
};

export const deleteToDo = async (userId, toDoId) => {
	const dbRef = getDbRef(userId);
	return dbRef.doc(toDoId).delete();
};

export const fetchToDos = async (
	userId,
	{ searchQuery, tags, pending, complete }
) => {
	let dbRef = getDbRef(userId);
	// Text search on title & description
	if (!isEmpty(searchQuery)) {
		const searchTerms = words(searchQuery);
		dbRef = dbRef.where('searchTerms', 'array-contains-any', searchTerms);
	}
	// Tag search
	if (!isEmpty(tags)) {
		tags.forEach((tag) => {
			dbRef = dbRef.where(`tagsSearchTerms.${tag}`, '==', true);
		});
	}
	// Filter by status only if 1 of the statuses is false
	if (!pending || !complete) {
		dbRef = dbRef.where('pending', '==', pending);
		dbRef = dbRef.where('complete', '==', complete);
	}

	return dbRef.get();
};
