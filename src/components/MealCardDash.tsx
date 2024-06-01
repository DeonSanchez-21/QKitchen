import React, { useState } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'

let newDate = new Date()
let date_raw = newDate.getDate();
let month_raw = newDate.getMonth() + 1;
let year = newDate.getFullYear();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekday[newDate.getDay()];
let time = newDate.getHours();

const MealCardDash = () => {
    const [currentMeal, setCurrentMeal]  = useState(0);

    const timeOfDay = () => {
        let tod = ''
        if (time >= 0 && time < 12) {
            // Morning actions
            tod = 'Breakfast'
            currentMeal !== 0 && setCurrentMeal(0)
            // Perform morning-specific tasks here
        } else if (time >= 12 && time < 18) {
            // Afternoon actions
            tod = 'Lunch'
            currentMeal !== 1 && setCurrentMeal(1)
            // Perform afternoon-specific tasks here
        } else {
            // Night actions
            tod = 'dinner'
            currentMeal !== 2 && setCurrentMeal(2)
            // Perform night-specific tasks here
        }
        return tod
    }
  return (
    <Box>
        <Stack direction='row' spacing={3} justifyContent='space-between' alignItems='center'>
            <Stack>
                <Typography variant='body1'>
                    {day}
                </Typography>
                <Typography variant='h4'>
                    {date_raw}
                </Typography>
            </Stack>
            <Typography variant='h4'>
                {timeOfDay()}
            </Typography>
            <Stack direction='row' spacing={0}>
                <IconButton size='small'>
                    <AutorenewIcon/>
                </IconButton>
                <IconButton size='small'>
                    <MoreHorizIcon/>
                </IconButton>
            </Stack>
        </Stack>

        <Typography variant="h5" textAlign='center' py={1}>
            hello
        </Typography>

        <Stack spacing={3} direction='row' alignItems='center'>
            {/* <img className='dash_meal_img' src={currentPlan?.image}/> */}
            <Box sx={{width: '150px'}} >
                <Stack justifyContent='space-between' direction="row">
                    <Typography>
                        Calories
                    </Typography>
                    <Typography>
                        2000
                    </Typography>
                </Stack>
                <Stack justifyContent='space-between' direction="row">
                    <Typography>
                        Fat
                    </Typography>
                    <Typography>
                        2000
                    </Typography>
                </Stack>
                <Stack justifyContent='space-between' direction="row">
                    <Typography>
                        Protien
                    </Typography>
                    <Typography>
                        2000
                    </Typography>
                </Stack>
                <Stack justifyContent='space-between' direction="row">
                    <Typography>
                        Carbs
                    </Typography>
                    <Typography>
                        2000
                    </Typography>
                </Stack>
            </Box>
        </Stack>
        {/* <MealCard key={currentPlan?.id} readyIn={currentPlan?.readyInMinutes} index={currentMeal} id={currentPlan?.id} title={currentPlan?.title} image={currentPlan?.image} nutrition={currentPlan?.nutrition} ingredients={currentPlan?.extendedIngredients}/>  */}
    </Box>
  )
}

export default MealCardDash