import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { RecipeCard } from "./RecipeCard";
import { Box, Container } from "@mui/system";
import { Pagination } from "@mui/lab";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";

export function Favorites() {
    const {currentUser} = useContext<any>(AuthContext)
    const ref = doc(db, "favorites", currentUser.uid);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePerPage] = useState(8);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [ loadingState, setLoadingState ] = useState('not_loaded')

    const paginate = (event: React.ChangeEvent<unknown>,page: number ) => {
        setCurrentPage(page);

        window.scrollTo({ top: 1600, behavior: 'smooth' });
    }

    useEffect(()=>{
        setLoadingState('loading')
        const getData = async () =>{
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                setRecipes(docSnap.data().recipes)
                setLoadingState('loaded')
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setLoadingState('error')
            }
        }
        getData();
    },[])
    
    const recipeList = recipes?.map((recipes) => {
        const id: number = recipes.num;
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
        <>
            {loadingState === 'not_loaded' && <Box height='80vh' className='center'><CircularProgress size={100}/></Box>} 
            {loadingState === 'loading' && <Box height='80vh' className='center'><CircularProgress size={100}/></Box>} 
            {loadingState ==='error' && 'something went wrong'} 
            {loadingState === 'loaded' && <Grid container spacing={3}> {currentRecipes}</Grid>} 
           
            <Container maxWidth='sm' sx={{ display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                {recipeList.length > 9 && (<Pagination 
                color="primary"
                defaultPage={1}
                count={Math.ceil(recipeList?.length / recipePerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"/>) }
            </Container>
        </>
    )
}