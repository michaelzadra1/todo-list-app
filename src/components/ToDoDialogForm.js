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
	makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CreateIcon from '@material-ui/icons/Create';
import MomentUtils from '@date-io/moment';
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { isEmpty, capitalize } from 'lodash';

import { AuthContext } from '../context/Auth';
import { createToDo } from '../api/repository.js';

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
					tags: []
			  })
			: setToDo({ ...toDoItem });
	}, [toDoItem, mode]);

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

	const handleUpdateToDo = async () => {
		try {
			setLoading(true);
			await createToDo(currentUser.uid, toDo);
			setLoading(false);
			closeDialog();
		} catch (err) {
			setLoading(false);
			setError({ ...error, submit: 'Error submitting to-do.' });
		}
	};

	const renderError = () => (
		<FormHelperText role="error" error={true} className={classes.dialogError}>
			{error.submit}
		</FormHelperText>
	);

	const { title, description, dueDate, tags } = toDo;

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			aria-labelledby="create-todo-item"
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle id="create-todo-item" className={classes.dialogTitle}>
				<CreateIcon className={classes.createIcon} />
				{`${capitalize(mode)} To-Do`}
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
							disablePast
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
						getOptionLabel={(option) => option.toLowerCase()}
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
		</Dialog>
	);
};

export default ToDoDialogForm;
