import React from 'react';
import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Box,
	Tooltip,
	FormControl,
	Select,
	MenuItem,
	Typography,
	FormHelperText,
	makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
	searchQueryInput: {
		width: '400px'
	},
	inputMargin: {
		margin: `${theme.spacing(1)}px 0`
	},
	submitButton: {
		marginTop: `${theme.spacing(2)}px`
	},
	sortBySelect: {
		width: '300px'
	},
	sortByLabel: {
		marginLeft: '0px',
		fontSize: '1.0em'
	}
}));

const SORT_BY_OPTIONS = ['Newest To-Dos', 'Oldest To-Dos', 'Closest Due Date'];

const ToDoSearchFilters = (props) => {
	const classes = useStyles();

	const { search, handleUpdateSearch, searchableTags, executeSearch } = props;

	const handleSearch = (e) => {
		e.preventDefault();
		executeSearch(search);
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
						handleUpdateSearch({ ...search, searchQuery: e.target.value })
					}
					value={search.searchQuery}
				/>
			</Box>
			<Autocomplete
				className={classes.inputMargin}
				id="search-tags"
				multiple
				options={searchableTags}
				onChange={(_, values) =>
					handleUpdateSearch({ ...search, tags: [...values] })
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
			<Box className={classes.inputMargin} display="flex" flexWrap="wrap">
				<Tooltip title="Filter by pending status" placement="top">
					<FormControlLabel
						control={
							<Checkbox
								checked={search.pending}
								onChange={(e) =>
									handleUpdateSearch({
										...search,
										pending: e.target.checked
									})
								}
								name="toggle-pending-search"
								color="primary"
								inputProps={{
									'aria-label':
										'Toggle filter to-dos by pending status'
								}}
							/>
						}
						label="Pending"
					/>
				</Tooltip>
				<Tooltip title="Filter by complete status" placement="top">
					<FormControlLabel
						control={
							<Checkbox
								checked={search.complete}
								onChange={(e) =>
									handleUpdateSearch({
										...search,
										complete: e.target.checked
									})
								}
								name="toggle-complete-search"
								color="primary"
								inputProps={{
									'aria-label':
										'Toggle filter to-dos by completed status'
								}}
							/>
						}
						label="Complete"
					/>
				</Tooltip>
				<FormControl variant="outlined" className={classes.sortBySelect}>
					<Select
						id="sort-by-select"
						value={search.sortBy}
						onChange={(e) =>
							handleUpdateSearch({
								...search,
								sortBy: e.target.value
							})
						}
						inputProps={{ 'aria-label': 'Sort By' }}
					>
						{SORT_BY_OPTIONS.map((option) => {
							return (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							);
						})}
					</Select>
					<FormHelperText className={classes.sortByLabel}>
						Sort By
					</FormHelperText>
				</FormControl>
			</Box>
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
