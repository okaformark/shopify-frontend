import React from 'react';
// --- Material Ui Imports --- //
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@mui/material/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

// --- Fill Image Card Component Imports --- //
import {
	FiCard,
	FiCardActions,
	FiCardContent,
	FiCardMedia,
} from './MaterialUiCard';
import { Badge } from '@material-ui/core';

// --- Style --- //
const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: '100%',
	},

	card: {
		width: 400,
		margin: 'auto',
		height: 400,
	},

	media: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	fiCardContent: {
		color: '#ffffff',
		backgroundColor: 'rgba(0,0,0,.24)',
	},
	fiCardContentTextSecondary: {
		color: 'rgba(255,255,255,0.78)',
	},
});

const NasaImage = ({
	imgSrc,
	full_name,
	name,
	earth_date,
	launch_date,
	landing_date,
	status,
	id,
}) => {
	const classes = useStyles();

	const [favorite, setFavorite] = React.useState({
		id: null,
		isFavorite: false,
		favoriteCount: 0,
	});

	React.useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorite));
	}, [favorite]);

	const toggleFavorite = (favId) => {
		if (id == favId) {
			setFavorite({
				id: favId,
				isFavorite: !favorite.isFavorite,
				favoriteCount: !favorite.isFavorite ? favorite.favoriteCount + 1 : 0,
			});
		}
	};
	return (
		<Container className={classes.container}>
			<Box
				sx={{
					width: 300,
					height: 'auto',
					backgroundColor: 'primary.dark',
					'&:hover': {
						opacity: [0.9, 0.8, 0.7],
					},
				}}
				my={4}
			>
				<Typography variant='h6' paragraph align='center'>
					{full_name}
				</Typography>

				<Typography variant='overline' display='block'>
					{`Launch date:  ${launch_date}`}
				</Typography>
				<Typography variant='overline' display='block'>
					{`Landing date:  ${landing_date}`}
				</Typography>

				<FiCard className={classes.card}>
					<FiCardMedia
						media='picture'
						alt={full_name}
						image={imgSrc}
						title={name}
					/>
					<FiCardContent className={classes.fiCardContent}>
						<Typography gutterBottom variant='h5' component='h2'>
							{name}
						</Typography>
						<Typography
							variant='button'
							display='block'
							className={classes.fiCardContentTextSecondary}
							component='p'
						>
							{'earth date: '} {earth_date}
						</Typography>
						<Chip label={status} color='success' />
					</FiCardContent>
					<FiCardActions className={classes.fiCardContent}>
						<IconButton
							aria-label='add to favorite'
							onClick={() => toggleFavorite(id)}
						>
							<Badge badgeContent={favorite.favoriteCount} color='primary'>
								<FavoriteIcon
									color={favorite.isFavorite ? 'success' : 'action'}
								/>
							</Badge>
						</IconButton>
					</FiCardActions>
				</FiCard>
			</Box>
		</Container>
	);
};

export default NasaImage;
