import React,{ useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Box, Container, Paper, InputBase, Divider, IconButton, Grid, Pagination } from "@mui/material"
import { fetchData } from '../utils/fetchData';
import { RestaurantCard } from '../components/RestaurantCard'

export function Restaurants(){
    const [search, setSearch] = useState('');
    const [restaurants, setRestaurants] = useState<any[]>(() => JSON.parse(localStorage?.getItem('restaurants') ?? '[]'));
    const [term, setTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [restaurantsPerPage] = useState(12);

    const [long, setLong] = useState<any>('')
    const [lat, setLat] = useState<any>('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        })
    },[])

    useEffect(()=>{
        window.localStorage.setItem('restaurants', JSON.stringify(restaurants))
        
    },[restaurants])

    const handleSearch = async () => {
        if (search) {
            const restaurantsData = await fetchData(`https://api.spoonacular.com/food/restaurants/search?apiKey=90eac845919f468a927fd33e482f15e5&query=${term}&lat=${lat}&lng=${long}`);
            setRestaurants(restaurantsData?.restaurants );
            setCurrentPage(1)
            setTerm(search)
        }
    }
    
    const restaurantList = restaurants.map((restaurant)=> {
        const name: string = restaurant.name;
        const number: string = restaurant.phone_number;
        const lat: string = restaurant.address.lat
        const lon: string = restaurant.address.lon;
        const key: number = restaurant._id;
        const distance: string = restaurant.miles;
        const address: string = restaurant.address.street_addr;
        const image: string = restaurant.logo_photos[0];
        const isOpen: boolean = restaurant.is_open;
        const delivery: boolean = restaurant.offers_first_party_delivery;

        return (
            <RestaurantCard number={number} lat={lat} lon={lon} image={image} name={name} key={key} isOpen={isOpen} delivery={delivery} address={address} distance={distance}/>
        )
    })
        
    const paginate = (event: React.ChangeEvent<unknown>,page: number ) => {
        setCurrentPage(page);
        
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurantList?.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    
  return (
    <Box>
        <Container sx={{py:4}} maxWidth='sm'>
            <Paper elevation={3} sx={{display: 'flex', alignItems: 'center', p: 1}} component='form' onSubmit={(e) => e.preventDefault()}>
                <InputBase sx={{ml: 1, flex: 1}} placeholder="Search Restaurant" onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="submit" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Container>
        <Box sx={{flexGrow: 1, m: 3}}>
            {restaurantList?.length !== 0 && <Typography sx={{textTransform: 'capitalize'}} my={2} variant="h4"> {term? term : 'recent'} {term? 'restaurants:' : 'results:'}</Typography>}
            {restaurantList?.length === 0 ? <Typography align="center" variant="h4">No Restaurants Found</Typography> : <Grid container spacing={3} > {currentRestaurants} </Grid>}
        </Box>
        <Container maxWidth='sm' sx={{ display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            {restaurantList?.length > 9 && (<Pagination 
            color="primary"
            defaultPage={1}
            count={Math.ceil(restaurantList.length / restaurantsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"/>) }
        </Container>
    </Box>
  )
}
