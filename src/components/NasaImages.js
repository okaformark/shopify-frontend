import { useQuery } from 'react-query';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import NasaImage from './NasaImage';

const DEMO_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${DEMO_KEY}`;
const NasaImages = () => {
	const { data, error, isError, isLoading } = useQuery('nasa', () =>
		axios.get(URL)
	);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error! {error.message}</p>;
	return (
		<div className='nasa-photo-list'>
			<div className='nasa-photo-header' style={{ alignItems: 'center' }}>
				<Typography variant='h3' paragraph>
					MARS ROVER PHOTOS
				</Typography>
				<Typography variant='h5' paragraph>
					Querying by Martian sol 1000
				</Typography>
			</div>

			{data?.data.photos.map((photo) => (
				<NasaImage
					key={photo.id}
					earth_date={photo.earth_date}
					imgSrc={photo.img_src}
					full_name={photo.camera.full_name}
					name={photo.rover.name}
					landing_date={photo.rover.landing_date}
					launch_date={photo.rover.launch_date}
					status={photo.rover.status}
					sol={photo.sol}
					id={photo.id}
				/>
			))}
		</div>
	);
};

export default NasaImages;
