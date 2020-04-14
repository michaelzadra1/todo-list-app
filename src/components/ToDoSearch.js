import React, { useContext, useEffect, useState } from 'react';
import {
	CircularProgress,
	FormHelperText,
	Container,
	Typography,
	Box
} from '@material-ui/core';
import { union, sortBy } from 'lodash';

import ToDoList from './ToDoList';
import { AuthContext } from '../context/Auth';
import { fetchToDos } from '../api/repository';
import ToDoSearchFilters from './ToDoSearchFilters';

const ToDoSearch = () => {
	const { isSignedIn, currentUser } = useContext(AuthContext);

	const [toDos, setToDos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const [search, setSearch] = useState({
		searchQuery: '',
		tags: [],
		pending: true,
		complete: true
	});

	useEffect(() => {
		if (isSignedIn) {
			handleFetchToDos();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSignedIn, currentUser]);

	const handleFetchToDos = async () => {
		setLoading(true);
		try {
			const snapshot = await fetchToDos(currentUser.uid, search);
			const results = snapshot.docs.map((doc) => doc.data());
			const toDos = sortBy(results, (toDo) => -toDo.dueDate);
			setToDos(toDos);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError('Error fetching to-dos.');
		}
	};

	const handleUpdateSearch = (updatedSearch) => {
		setSearch(updatedSearch);
	};

	const renderError = () => (
		<FormHelperText role="error" error={true}>
			{error}
		</FormHelperText>
	);

	const renderSignInMessage = () => (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height={250}
			fontStyle="italic"
		>
			<Typography
				component="h2"
				variant="h6"
				color="textSecondary"
				align="center"
			>
				Please Sign In{' '}
				<span role="img" aria-label="happy sun">
					🌞
				</span>
			</Typography>
		</Box>
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
		let searchableTags = [];
		toDos.forEach((toDo) => {
			searchableTags = union(searchableTags, toDo.tags);
		});
		return (
			<ToDoSearchFilters
				search={search}
				searchableTags={searchableTags}
				handleUpdateSearch={handleUpdateSearch}
				executeSearch={handleFetchToDos}
			/>
		);
	};

	return (
		<Container maxWidth="sm">
			{isSignedIn ? (
				<React.Fragment>
					{renderToDoSearchFilters()}
					{renderToDoList()}
				</React.Fragment>
			) : (
				renderSignInMessage()
			)}
		</Container>
	);
};

export default ToDoSearch;
