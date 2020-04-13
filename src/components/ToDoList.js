import React, { useState } from 'react';
import { Fab, Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import ToDoDialogForm from './ToDoDialogForm';
import ToDoCard from './ToDoCard';

const useStyles = makeStyles((theme) => ({
	toDoListContainer: {
		padding: '32px',
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
			height={400}
		>
			<Typography
				component="h2"
				variant="h6"
				color="textSecondary"
				align="center"
				style={{ marginTop: '20px' }}
			>
				Looks like you have no to-dos. Please create one!
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
			<Fab
				color="primary"
				aria-label="create to-do item"
				onClick={() => handleOpen({ toDo: {}, mode: 'CREATE' })}
			>
				<Add />
			</Fab>
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
