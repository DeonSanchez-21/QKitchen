import { AppBar, Avatar, Container, IconButton, List, ListItem, Toolbar, Tooltip, Typography, Divider, Stack, Button} from "@mui/material";
import { Box } from "@mui/system";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { RecipeData } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import '../app.css';


export function RecipeDetails() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const { id } = useParams();
    
    const initialRecipeState = {
        title: '',
        analyzedInstructions: [{
            name: '',
            steps: [{
                number: 0,
                step: '',
                name: ''
            }]
        }],
        extendedIngredients: [{
            original: ''
        }],
        image: '',
        summary: ''
    }

    const [data, setData] = useState<RecipeData>(initialRecipeState);
    
    useEffect( () => {
        const getData = async() => {
            const newData = await fetchData(`https://api.spoonacular.com/recipes/${id}/information?apiKey=90eac845919f468a927fd33e482f15e5&includeNutrition=false`)
            setData(newData)
        }
        getData();
    },[])

    
    const stepList = data.analyzedInstructions[0].steps.map((item) => {
        const step: string = item.step;
        const number: number = item.number;
        return (
            <React.Fragment key={number}>
                <ListItem>
                    {number}:
                    <Container>
                        {step}
                    </Container>
                </ListItem>
                <Divider/>
            </React.Fragment>
        )
    })

    const ingredientsList = data.extendedIngredients.map((item,index) => {
        const name: string = item.original;
        const number: number = (index + 1);
        return (
            <React.Fragment key={number}>
                <ListItem>
                    {number}:
                    <Container>
                        {name}
                    </Container>
                </ListItem>
                <Divider/>
            </React.Fragment>
        )
    })

    const logOut = () => {
        signOut(auth)
        setIsLoggedIn(false);
    }

    if (isLoggedIn === false) return <Navigate to='/home'/>;

    return (
        <Box>
            <AppBar position='static'>
                <Container>
                    <Toolbar disableGutters>
                        <FastfoodOutlinedIcon  fontSize='large' />
                        
                            <Typography 
                            mr={2} 
                            color='secondary' 
                            variant="h4" 
                            sx={{
                                ml: 2,
                                fontSize: 'large',
                                display: { xs: 'flex', md: 'flex' },
                                fontWeight: 700,
                                textDecoration: 'none', 
                                color: 'inherit'
                            }}>
                                <Link style={{textDecoration: 'none', color:'white'}} to="/home">Q-Kitchen</Link>
                            </Typography>
                        

                        <Box flexGrow={1}></Box>

                        <Stack spacing={1} direction='row'>
                            <Button sx={{ display:{ xs:'none', sm:'flex'}}} size="small" color="inherit" variant="text" onClick={logOut}>
                                {isLoggedIn ? 'logout' : 'login'}
                            </Button>
                            <Avatar sx={{bgcolor: isLoggedIn ? 'white' : '', color: isLoggedIn ? '#1976d2' : ''}}>
                                <LocalDiningIcon />
                            </Avatar>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                <Typography mt={2} p={2} align="center" variant='h4'>
                    {data.title}
                </Typography>
            </Container>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row'}}}>
                <Box width={{xs: 1/1, md: 2/4}} p={2}>
                    <img className="img" src={data.image}/>
                    <Box mt={1}>
                        <Typography py={1} variant='h5'>Summary:</Typography>
                        <Divider/>
                        <Typography py={2} align="center" variant='body1' dangerouslySetInnerHTML={{__html: data.summary}}></Typography>
                    </Box>
                </Box>

                <Box width={{xs: 1/1, md: 2/4}} p={2} mt={1}>
                    <Box >
                        <Typography variant="h5">Ingredients:</Typography>
                        <List >
                            {ingredientsList}
                        </List>
                    </Box>   

                    <Box mt={2}>
                        <Typography variant="h5">Instructions:</Typography>
                        <List >
                            {stepList}
                        </List>
                    </Box>   
                </Box>
            </Box>
        </Box>
    )
}