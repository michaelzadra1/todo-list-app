import React, { useState } from 'react';
import { Fab, Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import ToDoDialogForm from './ToDoDialogForm';
import ToDoCard from './ToDoCard';

const useStyles = makeStyles((theme) => ({
	toDoListContainer: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
		listStyle: 'none'
	}
}));

const ToDoList = (props) => {
	const classes = useStyles();

	const [selectedToDo, setSelectedToDo] = useState({
		toDo: {},
		open: false,
		mode: 'CREATE'
	});

	const handleOpen = ({ toDo, mode }) => {
		setSelectedToDo({ ...setSelectedToDo, toDo, mode, open: true });
	};

	const handleClose = ({ fetchToDos }) => {
		setSelectedToDo({
			...setSelectedToDo,
			toDo: {},
			open: false,
			mode: 'CREATE'
		});
		if (fetchToDos) {
			props.refreshList();
		}
	};

	const renderEmptyToDos = () => (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height={250}
		>
			<Typography
				component="h2"
				variant="h6"
				color="textSecondary"
				align="center"
			>
				No Results{' '}
				<span role="img" aria-label="sad face">
					😔
				</span>
			</Typography>
		</Box>
	);

	const { toDos } = props;
	const { open, mode, toDo } = selectedToDo;

	return (
		<React.Fragment>
			<ToDoDialogForm
				toDoItem={toDo}
				open={open}
				mode={mode}
				closeDialog={handleClose}
			/>
			{/* Screen reader only header */}
			<Typography component="h2" variant="srOnly">
				To-do item list
			</Typography>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Fab
					variant="extended"
					color="primary"
					aria-label="create to-do item"
					onClick={() => handleOpen({ toDo: {}, mode: 'CREATE' })}
				>
					<Add style={{ marginRight: '8px' }} />
					Create To-Do
				</Fab>
			</Box>
			{toDos.length > 0 ? (
				<Grid
					className={classes.toDoListContainer}
					container
					spacing={4}
					component="ul"
				>
					{toDos.map((toDo) => (
						<ToDoCard
							key={toDo.id}
							toDoItem={toDo}
							openDialog={handleOpen}
						/>
					))}
				</Grid>
			) : (
				renderEmptyToDos()
			)}
		</React.Fragment>
	);
};

export default ToDoList;
