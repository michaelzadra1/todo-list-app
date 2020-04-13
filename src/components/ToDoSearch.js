import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, FormHelperText, Container } from '@material-ui/core';
import { union } from 'lodash';

import ToDoList from './ToDoList';
import { AuthContext } from '../context/Auth';
import { fetchToDos } from '../api/repository';
import ToDoSearchFilters from './ToDoSearchFilters';

const ToDoSearch = () => {
	const { isSignedIn, currentUser } = useContext(AuthContext);
	const [toDos, setToDos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (isSignedIn) {
			handleFetchToDos();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSignedIn, currentUser]);

	const handleFetchToDos = async () => {
		setLoading(true);
		try {
			const snapshot = await fetchToDos(currentUser.uid);
			setToDos(snapshot.docs.map((doc) => doc.data()));
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError('Error fetching to-dos.');
		}
	};

	const renderError = () => (
		<FormHelperText role="error" error={true}>
			{error}
		</FormHelperText>
	);

	const renderToDoList = () => {
		return loading ? (
			<CircularProgress />
		) : error ? (
			renderError()
		) : (
			<ToDoList toDos={toDos} refreshList={handleFetchToDos} />
		);
	};

	const renderToDoSearchFilters = () => {
		let tags = [];
		toDos.forEach((toDo) => {
			tags = union(tags, toDo.tags);
		});
		return <ToDoSearchFilters searchableTags={tags} />;
	};

	return (
		<Container maxWidth="sm">
			{isSignedIn ? (
				<React.Fragment>
					{renderToDoSearchFilters()}
					{renderToDoList()}
				</React.Fragment>
			) : (
				<div>Plese sign in</div>
			)}
		</Container>
	);
};

export default ToDoSearch;
