import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ToDoDialogForm from './ToDoDialogForm';

const ToDoList = () => {
	const [open, setOpen] = useState(false);
	const [selectedToDo, setSelectedToDo] = useState({});

	const handleOpen = () => {
		setSelectedToDo({});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedToDo({});
	};

	return (
		<React.Fragment>
			<ToDoDialogForm
				toDoItem={selectedToDo}
				open={open}
				mode={'CREATE'}
				closeDialog={handleClose}
			/>
			<Fab
				color="primary"
				aria-label="create to do item"
				onClick={handleOpen}
			>
				<AddIcon />
			</Fab>
		</React.Fragment>
	);
};

export default ToDoList;
