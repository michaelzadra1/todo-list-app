import React, { useState, useContext, useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	CircularProgress,
	FormHelperText,
	Box,
	makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Create, Delete } from '@material-ui/icons';
import MomentUtils from '@date-io/moment';
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { isEmpty, capitalize } from 'lodash';
import moment from 'moment';

import { AuthContext } from '../context/Auth';
import { updateToDo, deleteToDo } from '../api/repository.js';

const useStyles = makeStyles((theme) => ({
	createIcon: {
		marginRight: theme.spacing(1)
	},
	tagsInput: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1)
	},
	dialogTitle: {
		paddingBottom: 0
	},
	dialogActions: {
		padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(
			2
		)}px ${theme.spacing(3)}px`
	},
	dialogError: {
		float: 'right',
		padding: `0px ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
			3
		)}px`
	}
}));

const ToDoDialogForm = (props) => {
	const classes = useStyles();

	const { currentUser } = useContext(AuthContext);

	const [toDo, setToDo] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});

	const { toDoItem, open, mode, closeDialog } = props;

	const { title, description, dueDate, tags } = toDo;

	useEffect(() => {
		setError({
			title: '',
			description: '',
			submit: ''
		});
		mode === 'CREATE'
			? setToDo({
					title: '',
					description: '',
					dueDate: new Date(),
					pending: true,
					complete: false,
					tags: []
			  })
			: setToDo({
					...toDoItem,
					dueDate: moment(toDoItem.dueDate.toDate()).toDate()
			  });
	}, [toDoItem, mode]);

	const handleUpdateToDo = async () => {
		try {
			setLoading(true);
			await updateToDo(currentUser.uid, toDo);
			setLoading(false);
			closeDialog({ fetchToDos: true });
		} catch (err) {
			setLoading(false);
			setError({ ...error, submit: 'Error submitting to-do.' });
		}
	};

	const handleDeleteToDo = async () => {
		try {
			setLoading(true);
			await deleteToDo(currentUser.uid, props.toDoItem.id);
			setLoading(false);
			closeDialog({ fetchToDos: true });
		} catch (err) {
			setLoading(false);
			setError({ ...error, submit: 'Error deleting to-do.' });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError({ ...error, submit: '' });
		let isSet = false;
		let titleError, descriptionError;
		// Title required
		if (isEmpty(title)) {
			isSet = true;
			titleError = 'Title required.';
		}
		// Description required
		if (isEmpty(description)) {
			isSet = true;
			descriptionError = 'Description required.';
		}
		if (isSet) {
			setError({
				...error,
				title: titleError,
				description: descriptionError
			});
		} else {
			handleUpdateToDo();
		}
	};

	const renderError = () => (
		<FormHelperText role="error" error={true} className={classes.dialogError}>
			{error.submit}
		</FormHelperText>
	);

	const renderToDoDeleteDialog = () => (
		<React.Fragment>
			<DialogTitle id={`delete-todo-item`} className={classes.dialogTitle}>
				<Box display="flex" alignItems="center">
					<Delete className={classes.createIcon} />
					Are you sure you want to delete this To-Do item?
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					After deletion, it cannot be recovered.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog} color="primary">
					Cancel
				</Button>
				<Button onClick={handleDeleteToDo} color="secondary">
					{loading ? (
						<CircularProgress color="inherit" size={25} />
					) : (
						'Delete'
					)}
				</Button>
			</DialogActions>
			{!isEmpty(error.submit) ? renderError() : null}
		</React.Fragment>
	);

	const renderEditToDoDialog = () => (
		<React.Fragment>
			<DialogTitle id={`${mode}-todo-item`} className={classes.dialogTitle}>
				<Box display="flex" alignItems="center">
					<Create className={classes.createIcon} />
					{`${capitalize(mode)} To-Do`}
				</Box>
			</DialogTitle>
			<form onSubmit={handleSubmit} autoComplete="off">
				<DialogContent>
					<DialogContentText component="h3">
						{`${capitalize(mode)} to-do item below`}
					</DialogContentText>
					{/* Title */}
					<TextField
						id="to-do-title"
						label="Title"
						variant="outlined"
						type="text"
						autoFocus
						margin="normal"
						fullWidth
						value={title}
						onChange={(e) => {
							setToDo({ ...toDo, title: e.target.value });
							setError({ ...error, title: '' });
						}}
						helperText={isEmpty(error.title) ? '' : error.title}
						error={!isEmpty(error.title)}
					/>
					{/* Description */}
					<TextField
						id="to-do-description"
						label="Description"
						variant="outlined"
						type="text"
						margin="normal"
						multiline
						fullWidth
						rows={3}
						value={description}
						onChange={(e) => {
							setToDo({ ...toDo, description: e.target.value });
							setError({ ...error, description: '' });
						}}
						helperText={
							isEmpty(error.description) ? '' : error.description
						}
						error={!isEmpty(error.description)}
					/>
					{/* Due Date */}
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<KeyboardDateTimePicker
							id="to-do-due-date"
							label="Due Date"
							inputVariant="outlined"
							margin="normal"
							value={dueDate}
							onChange={(date) =>
								setToDo({ ...toDo, dueDate: date.toDate() })
							}
							KeyboardButtonProps={{
								'aria-label': 'select date'
							}}
						/>
					</MuiPickersUtilsProvider>
					{/* Categorization Tags */}
					<Autocomplete
						className={classes.tagsInput}
						id="to-do-tags"
						multiple
						options={tags}
						value={tags}
						onChange={(_, values) =>
							setToDo({ ...toDo, tags: [...values] })
						}
						freeSolo
						open={false}
						renderInput={(params) => (
							<TextField {...params} variant="outlined" label="Tags" />
						)}
					/>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button onClick={closeDialog} variant="contained">
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant="contained"
						color="primary"
						type="submit"
					>
						{loading ? (
							<CircularProgress color="inherit" size={25} />
						) : (
							'Submit'
						)}
					</Button>
				</DialogActions>
				{!isEmpty(error.submit) ? renderError() : null}
			</form>
		</React.Fragment>
	);

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			aria-labelledby={`${mode}-todo-item`}
			fullWidth
			maxWidth="sm"
		>
			{mode === 'DELETE' ? renderToDoDeleteDialog() : renderEditToDoDialog()}
		</Dialog>
	);
};

export default ToDoDialogForm;
