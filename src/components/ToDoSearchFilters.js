import React, { useState } from 'react';
import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Box,
	makeStyles,
	Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
	searchQueryInput: {
		width: '300px'
	},
	inputMargin: {
		margin: `${theme.spacing(0.5)}px 0`
	},
	submitButton: {
		marginTop: `${theme.spacing(2)}px`
	}
}));

const ToDoSearchFilters = (props) => {
	const classes = useStyles();

	const [search, setSearch] = useState({
		searchQuery: '',
		status: 'pending',
		tags: [],
		overdue: true,
		pending: true,
		complete: true
	});

	const { searchQuery, overdue, pending, complete } = search;

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(search);
	};

	return (
		<Box my={4} component="form" onSubmit={handleSearch} autoComplete="off">
			<Typography component="h2" variant="h6" gutterBottom>
				Refine Results
			</Typography>
			<Box display="flex" alignItems="center" flexWrap="wrap">
				<TextField
					className={`${classes.searchQueryInput} ${classes.inputMargin}`}
					id="search-query"
					label="Filter by Title or Description"
					variant="outlined"
					autoComplete="off"
					onChange={(e) =>
						setSearch({ ...search, searchQuery: e.target.value })
					}
					value={searchQuery}
				/>
				<Box textAlign="center" className={classes.inputMargin}>
					<FormControlLabel
						control={
							<Checkbox
								checked={pending}
								onChange={(e) =>
									setSearch({
										...search,
										pending: e.target.checked
									})
								}
								name="toggle-pending-search"
								color="primary"
							/>
						}
						label="Pending"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={complete}
								onChange={(e) =>
									setSearch({
										...search,
										complete: e.target.checked
									})
								}
								name="toggle-complete-search"
								color="primary"
							/>
						}
						label="Complete"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={overdue}
								onChange={(e) =>
									setSearch({
										...search,
										overdue: e.target.checked
									})
								}
								name="toggle-overdue-search"
								color="secondary"
							/>
						}
						label="Overdue"
					/>
				</Box>
			</Box>
			<Autocomplete
				className={classes.inputMargin}
				id="search-tags"
				// limitTags={4}
				multiple
				getOptionLabel={(option) => option.toLowerCase()}
				options={props.searchableTags}
				onChange={(_, values) =>
					setSearch({ ...search, tags: [...values] })
				}
				freeSolo
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Filter by Tags"
					/>
				)}
			/>
			<Button
				onClick={handleSearch}
				className={classes.submitButton}
				color="primary"
				variant="contained"
				type="submit"
			>
				Search
			</Button>
		</Box>
	);
};

export default ToDoSearchFilters;
