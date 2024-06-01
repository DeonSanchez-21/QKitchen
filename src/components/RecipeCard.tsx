import { Button, Card, CardActions, CardContent, CardMedia, Fab, Grid, Tooltip, Typography, Zoom } from "@mui/material";
import { useEffect, useContext,useState } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from "axios";
import '../app.css' 

type KeyProp = {
    title: string
    image: string
    imageType?: string
    num: number
}

export function RecipeCard(props: KeyProp) {
    const [favRecipes, setFavRecipes] = useState<{num: number}[]>([]);
    const [inFav, setInFav] = useState(false)
    const {currentUser} = useContext<any>(AuthContext)
    const ref = doc(db, "favorites", currentUser?.uid ?? JSON.parse(localStorage.getItem('currentUser') || '{}') );

    useEffect(()=>{
        const getData = async () =>{ 
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                setFavRecipes(docSnap.data().recipes)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getData();
        if (currentUser !== null) window.localStorage.setItem('currentUser', JSON.stringify(currentUser.uid))
    },[])

    useEffect(() => {
        const array = favRecipes?.map((recipes) => {
            const id: number = recipes.num;
            return id
        }) 
        setInFav(array.includes(props.num))
    },[favRecipes])
    
    const addRecipe = async () => {
        axios.get(`https://api.spoonacular.com/recipes/${props.num}/information?apiKey=90eac845919f468a927fd33e482f15e5`).then(res => { 
            const data = {
                title: res.data.title,
                num: res.data.id,
                image: res.data.image
            }
           save(data)
        }).catch(err => {
            console.log(err)
        })

         const save = async (res: KeyProp) => {
            try{
            await updateDoc(ref, {
                recipes: arrayUnion(res)
            });
            setInFav(true)
            } catch (err) {
                console.log(err);
            }
        }
    }

    const removeRecipe = () => {
        axios.get(`https://api.spoonacular.com/recipes/${props.num}/information?apiKey=90eac845919f468a927fd33e482f15e5`).then(res => { 
            const data = {
                title: res.data.title,
                num: res.data.id,
                image: res.data.image
            }
           unSave(data)
        }).catch(err => {
            console.log(err)
        })

        const unSave = async (res: KeyProp) => {
            try{
                await updateDoc(ref, {
                    recipes: arrayRemove(res)
                });
                setInFav(false)
            } catch (err) {
                console.log(err);
            }
        }
    } 

    return(
        <Grid xs={12} sm={6} md={4} lg={3} item>
            <Card sx={{position: 'relative',}}>
                <CardMedia 
                component='img'
                height='200'
                image={props.image}
                />
                <CardContent sx={{backgroundColor:'info'}}>
                    <Typography variant="h5" height='4rem'>
                        {props.title?.length >= 25 ? props.title.slice(0, 35) + "..." : props.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link className="link" to={`/recipeDetails/${props.num}`}>
                        <Button size="small" >recipe</Button>
                    </Link>
                    {inFav ? <Tooltip TransitionComponent={Zoom} title='Dislike'><Fab sx={{position: 'absolute', m: 2, top: 0, right: 0, opacity: 0.85}}  size="medium" onClick={ () => removeRecipe() }><FavoriteIcon color="error"/></Fab></Tooltip> : <Tooltip TransitionComponent={Zoom} title='Like'><Fab sx={{position: 'absolute', m: 2, top: 0, right: 0, opacity: 0.85, backdropFilter: 'blur(10px)'}}  size="medium" onClick={ () => addRecipe() }><ThumbUpIcon/></Fab></Tooltip>}
                </CardActions>
            </Card>
        </Grid>
    )
}