import { Box, Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import { db, auth } from "../firebase"
import MealCard from '../components/MealCard';
import { fetchData } from '../utils/fetchData';
import dilla from '../assets/images/icons8-quesadilla-48.png'
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import MealCardDash from '../components/MealCardDash';

let newDate = new Date()
let date_raw = newDate.getDate();
let month_raw = newDate.getMonth() + 1;
let year = newDate.getFullYear();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekday[newDate.getDay()];
let time = newDate.getHours();


const DashBoard = () => {
    const {currentUser} = useContext<any>(AuthContext)
    const [diet, setDiet] = useState<string | null>(() => JSON.parse(localStorage?.getItem('diet') )?? 'Anything');
    const ref = doc(db, 'userInfo', currentUser.uid)
    const [nutrition, setNutrition] =  useState(" ");
    const [loading, setLoading ] = useState(true);
    const [cals, setCals] = useState(() => JSON.parse(localStorage?.getItem('d_cals') ?? '2000',));
    const [currentMeal, setCurrentMeal]  = useState(0);
    const [plan, setPlan] = useState(() => JSON.parse(localStorage?.getItem('daily_meal_plan') ?? '[]'))
    const currentPlan = plan && plan[currentMeal];

    const generate = async() => {
        const plan = await fetchData(`https://api.spoonacular.com/mealplanner/generate?apiKey=90eac845919f468a927fd33e482f15e5&timeFrame=day&targetCalories=${cals}&diet=${diet}`)
        const recipeDetails = await Promise.all(plan?.meals?.map(async(meal: any) => {
            const id: number = meal.id;

            const mealData = await fetchData(`https://api.spoonacular.com/recipes/${id}/information?apiKey=90eac845919f468a927fd33e482f15e5&includeNutrition=true`)
            return await mealData
        }))
        setPlan(recipeDetails)
        
    }

    useEffect(()=> {
        const getData = async () => {
            
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                setNutrition(docSnap.data().nutrition.diet)
                setLoading(false)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getData();
    },[])

  return (
    loading ? <Stack sx={{ display: 'flex', height:'100vh', alignItems:'center', justifyContent: 'center'}}><CircularProgress size={80}/></Stack> : 
    <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={6} lg={7}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                minHeight: 240
                }}
            >
                {plan === null || plan.length === 0  ? ( 
                    <Button onClick={generate}> generate </Button>
                ) : (
                    <MealCardDash/>
                )}
            </Paper>
        </Grid>
        {/* Recent Deposits */}

        <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
                alignItems:'center'
                }}
            >
                <Typography variant='h4'>
                    Diet
                </Typography>
                <Typography variant='h4'>
                    {diet}
                </Typography>
                <img src={dilla} alt='anyting'/>
            </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h4'>
                    order
                </Typography>
            </Paper>
        </Grid>
    </Grid>
  )
}

export default DashBoard