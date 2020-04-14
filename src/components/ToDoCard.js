import React, { useContext, useState } from 'react';
import {
	Box,
	Grid,
	Card,
	CardContent,
	Chip,
	Typography,
	CardActions,
	Checkbox,
	IconButton,
	Tooltip,
	CircularProgress,
	FormHelperText,
	makeStyles
} from '@material-ui/core';
import { Edit, LocalOffer, Delete, Event } from '@material-ui/icons';
import moment from 'moment';

import { AuthContext } from '../context/Auth';
import { updateToDo } from '../api/repository.js';

const useStyles = makeStyles((theme) => ({
	toDoCardContent: {
		padding: `0 ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
			3
		)}px`
	},
	toDoCardTopActions: {
		justifyContent: 'space-between',
		paddingLeft: '0'
	},
	editIcon: {
		marginRight: '5px',
		fontSize: '1.3em'
	},
	tagsContainer: {
		'& > *': {
			margin: '5px'
		}
	},
	subTitleFont: {
		fontSize: '1rem'
	},
	dialogError: {
		paddingLeft: theme.spacing(3)
	}
}));

const ToDoCard = (props) => {
	const classes = useStyles();

	const { currentUser } = useContext(AuthContext);

	const {
		title,
		description,
		dueDate,
		tags,
		pending,
		complete
	} = props.toDoItem;

	const [status, setStatus] = useState({
		complete,
		pending,
		loading: false,
		error: ''
	});

	const handleStatusChange = async (e) => {
		try {
			setStatus({ ...status, loading: true, error: '' });

			const isCompleting = status.complete === true ? false : true;
			await updateToDo(currentUser.uid, {
				...props.toDoItem,
				pending: !isCompleting,
				complete: isCompleting
			});
			setStatus({
				...status,
				pending: !isCompleting,
				complete: isCompleting,
				loading: false
			});
		} catch (err) {
			setStatus({
				...status,
				loading: false,
				error: 'Error updating status.'
			});
		}
	};

	const renderStatusError = () => (
		<FormHelperText role="error" error={true} className={classes.dialogError}>
			{status.error}
		</FormHelperText>
	);

	const formattedDate = moment(dueDate.toDate()).format('DD MMMM, h:mm a');

	return (
		<Grid item component="li" xs={12}>
			<Card>
				<CardActions className={classes.toDoCardTopActions}>
					{/* Status */}
					<Box display="flex" alignItems="center">
						{status.loading ? (
							<CircularProgress
								color="inherit"
								size={25}
								style={{ marginLeft: '10px' }}
							/>
						) : (
							<React.Fragment>
								<Tooltip
									title={`Mark as ${
										status.complete ? 'Pending' : 'Complete'
									}`}
									placement="top"
								>
									<Checkbox
										checked={status.complete}
										onClick={handleStatusChange}
										color="primary"
										inputProps={{
											'aria-label': `mark to-do as ${
												status.complete ? 'pending' : 'complete'
											}`
										}}
									/>
								</Tooltip>
								<Typography
									component="label"
									variant="button"
									color={status.complete ? 'primary' : 'textSecondary'}
								>
									{status.complete ? 'Complete' : 'Pending'}
								</Typography>
							</React.Fragment>
						)}
					</Box>
					{/* Action buttons */}
					<Box>
						<Tooltip title="Edit" placement="top">
							<IconButton
								className={classes.noBoxShadow}
								aria-label="edit to-do item"
								size="medium"
								onClick={() =>
									props.openDialog({
										toDo: props.toDoItem,
										mode: 'EDIT'
									})
								}
							>
								<Edit fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Delete" placement="top">
							<IconButton
								aria-label="delete to-do item"
								size="medium"
								onClick={() =>
									props.openDialog({
										toDo: props.toDoItem,
										mode: 'DELETE'
									})
								}
							>
								<Delete fontSize="inherit" />
							</IconButton>
						</Tooltip>
					</Box>
				</CardActions>
				{status.error ? renderStatusError() : null}
				<CardContent className={classes.toDoCardContent}>
					{/* Title & Description */}
					<Box mb={2}>
						<Typography variant="h6" component="h2" gutterBottom>
							{title}
						</Typography>
						<Typography variant="body1" component="p">
							{description}
						</Typography>
					</Box>
					{/* Due Date */}
					<Box mb={2}>
						<Typography
							className={classes.subTitleFont}
							variant="h6"
							component="h3"
							gutterBottom
						>
							Due Date
						</Typography>
						<Box display="flex" alignItems="center">
							<Typography variant="body1" component="p"></Typography>
							<Event
								style={{
									marginLeft: '-3px',
									marginRight: '5px'
								}}
							/>
							{formattedDate}
						</Box>
					</Box>
					{/* Tags */}
					{tags.length > 0 ? (
						<Box
							display="flex"
							flexDirection="column"
							alignItems="baseline"
						>
							<Typography
								className={classes.subTitleFont}
								variant="h6"
								component="h3"
								gutterBottom
							>
								Tags
							</Typography>
							<Box
								className={classes.tagsContainer}
								display="flex"
								flexWrap="wrap"
								alignItems="center"
							>
								<LocalOffer style={{ marginLeft: 0 }} />
								{tags.map((tag) => (
									<Chip label={tag} key={tag} />
								))}
							</Box>
						</Box>
					) : null}
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ToDoCard;
