import { Box, Container, Divider, Grid, IconButton, InputBase, Pagination, Paper, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { RecipeCard } from "./RecipeCard";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

export function Explore() {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipes, setRecipes] = useState<any[]>(() => JSON.parse(localStorage?.getItem('recipes') ?? '[]'));
    const [recipePerPage] = useState(12);
    const [term, setTerm] = useState('');

    const paginate = (event: React.ChangeEvent<unknown>,page: number ) => {
        setCurrentPage(page);
        
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
    
    const handleSearch = async () => {
        if (search) {
            const recipesData = await fetchData(`https://api.spoonacular.com/recipes/complexSearch?apiKey=90eac845919f468a927fd33e482f15e5&query=${search}&number=100`);
            setRecipes(recipesData.results);
            setCurrentPage(1)
            setTerm(search)
        }
    }

    useEffect(()=>{
        window.localStorage.setItem('recipes', JSON.stringify(recipes))
        
    },[recipes])

    const recipeList = recipes?.map((recipes) => {
        const id: number = recipes.id;
        const title: string = recipes.title;
        const image: string = recipes.image;
        const imageType: string = recipes.imageType;
        return (
            <RecipeCard title={title} image={image} imageType={imageType} num={id} key={id}/>
        )
    }) 

    const indexOfLastRecipe = currentPage * recipePerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
    const currentRecipes = recipeList?.slice(indexOfFirstRecipe, indexOfLastRecipe);
    return (
        <Box>
            <Container sx={{py:4}} maxWidth='sm'>
                <Paper elevation={3} sx={{display: 'flex', alignItems: 'center', p: 1}} component='form' onSubmit={(e) => e.preventDefault()}>
                    <InputBase sx={{ml: 1, flex: 1}} placeholder="Search Recipe" onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="submit" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>
            <Box sx={{flexGrow: 1, m: 3}}>
                {recipeList?.length !== 0 && <Typography sx={{textTransform: 'capitalize'}} my={2} variant="h4"> {term? term : 'recent'} recipies:</Typography>}
                {recipeList?.length === 0 ? <Typography align="center" variant="h4">No Results Found</Typography> : <Grid container spacing={3} > {currentRecipes} </Grid>}
            </Box>
            <Container maxWidth='sm' sx={{ display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                {recipeList?.length > 9 && (<Pagination 
                color="primary"
                defaultPage={1}
                count={Math.ceil(recipeList.length / recipePerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"/>) }
            </Container>
        </Box>
    )
}