import React, { useState } from 'react';
import { Fab, Grid, makeStyles } from '@material-ui/core';
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

	const handleClose = () => {
		setOpen(false);
		setSelectedToDo({});
	};

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
		</React.Fragment>
	);
};

export default ToDoList;
