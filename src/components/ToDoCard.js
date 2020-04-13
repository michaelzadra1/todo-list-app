import React from 'react';
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
	makeStyles
} from '@material-ui/core';
import { Edit, LocalOffer, Delete, Event } from '@material-ui/icons';
import moment from 'moment';

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
	}
}));

const ToDoCard = (props) => {
	const classes = useStyles();

	const { title, description, dueDate, tags } = props.toDoItem;

	const formattedDate = moment(dueDate.toDate()).format('DD MMMM, h:mm a');

	return (
		<Grid item component="li" xs={12}>
			<Card>
				<CardActions className={classes.toDoCardTopActions}>
					{/* Status */}
					<Box display="flex" alignItems="center">
						<Tooltip title="Complete to-do" placement="top">
							<Checkbox
								defaultChecked
								color="primary"
								inputProps={{
									'aria-label': 'mark as done'
								}}
							/>
						</Tooltip>
						<Typography
							component="label"
							variant="button"
							color="textSecondary"
						>
							Pending
						</Typography>
					</Box>
					{/* Action buttons */}
					<Box>
						<Tooltip title="Edit" placement="top">
							<IconButton
								className={classes.noBoxShadow}
								aria-label="edit to-do item"
								size="medium"
							>
								<Edit fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Delete" placement="top">
							<IconButton aria-label="delete to-do item" size="medium">
								<Delete fontSize="inherit" />
							</IconButton>
						</Tooltip>
					</Box>
				</CardActions>
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
							<Typography variant="body1" component="p">
								<Event
									style={{
										marginLeft: '-3px',
										marginRight: '5px'
									}}
								/>
								{formattedDate}
							</Typography>
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
