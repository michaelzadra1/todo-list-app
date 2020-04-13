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

	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState(false);
	const [selectedToDo, setSelectedToDo] = useState({});

	const handleOpen = ({ toDo, mode }) => {
		setSelectedToDo(toDo);
		setMode(mode);
		setOpen(true);
	};

	const handleClose = ({ fetchToDos }) => {
		setOpen(false);
		setSelectedToDo({});
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

	return (
		<React.Fragment>
			{open ? (
				<ToDoDialogForm
					toDoItem={selectedToDo}
					open={open}
					mode={mode}
					closeDialog={handleClose}
				/>
			) : null}
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
