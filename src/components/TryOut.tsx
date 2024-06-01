import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup, styled, Grid, Slider, Stack, Button, Divider, Tooltip, tooltipClasses, TooltipProps, ClickAwayListener } from "@mui/material";
import MuiInput from '@mui/material/Input';
import { fetchData } from '../utils/fetchData';
import MealCard from './MealCard';
import { auth, provider } from '../firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
const Input = styled(MuiInput)`
    width: auto;
    `;

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 420,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        padding: '10px',
    },
}));


export function TryOut() {
    const [diet, setDiet] = useState<string | null>(() => JSON.parse(localStorage?.getItem('diet')) ?? 'Anything');
    const [cals, setCals] = useState(() => JSON.parse(localStorage?.getItem('d_cals') ?? '2000',));
    const [mealPlan, setMealPlan] = useState(() => JSON.parse(localStorage?.getItem('daily_meal_plan') ?? '[]'))
    const [nut, setNut] = useState(() => JSON.parse(localStorage?.getItem('try_chart_plan_nut') ?? '{}'))
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState<string | null>('')

    const handleClick = async () => {
        signInWithPopup(auth, provider).then((result) => {
            setEmail(result.user.email)
            localStorage.setItem('email', result.user.email )
        })
    }

    useEffect(() => {
        setEmail(localStorage.getItem('email'))
    },[email])

    const nutPro: number = nut.protein;
    const nutCarbs: number = nut.carbohydrates;
    const nutFat: number = nut.fat;
    const percent = [
        ["title", "Nutrients Chart"],
        ["Protein", nutPro],
        ["Carbs", nutCarbs],
        ["Fat", nutFat],
    ];

    const handleTooltipClose = () => {
      setOpen(false);
    };
    const handleTooltipOpen = () => {
      setOpen(true);
    };
    const options = {
        legend: "none",
        pieSliceText: "none",
    }
    const options2 = {
       title:'Calorie Chart'
    }
    const handleSliderChange = (event: Event, newCals: number | number[]) => {
        setCals(newCals);
        window.localStorage.setItem('d_cals', JSON.stringify(newCals));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCals(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = (value: any ) => {
        if (value < 1000) {
            setCals(1000);
        } else if (value > 5000) {
            setCals(5000);
        }
    };

    const generate = async() => {
        const plan = await fetchData(`https://api.spoonacular.com/mealplanner/generate?apiKey=90eac845919f468a927fd33e482f15e5&timeFrame=day&targetCalories=${cals}&diet=${diet}`)
        const recipeDetails = await Promise.all(plan?.meals?.map(async(meal: any) => {
            const id: number = meal.id;

            const mealData = await fetchData(`https://api.spoonacular.com/recipes/${id}/information?apiKey=90eac845919f468a927fd33e482f15e5&includeNutrition=true`)
            return await mealData
        }))
        setMealPlan(recipeDetails)
        setNut(plan.nutrients)
    }
    
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
          margin: theme.spacing(0.5),
          border: 0,
          '&.Mui-disabled': {
              border: 0,
            },
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
          },
          '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
        },
    }));
    
    const handleDiet = (
      event: React.MouseEvent<HTMLElement>,
      newDiet: string | null,
    ) => {
      setDiet(newDiet);
      window.localStorage.setItem('diet', JSON.stringify(newDiet));
    };

    useEffect(() => {
        window.localStorage.setItem('daily_meal_plan', JSON.stringify(mealPlan));
        window.localStorage.setItem('try_chart_plan_nut', JSON.stringify(nut));
    },[mealPlan])

    const mealList = mealPlan.map((meal: any, index: number)=> {
        const id: number = meal.id;
        const title: string = meal.title;
        const image: string = meal.image;
        const readyIn: number = meal.readyInMinutes;
        const ingredients: {
            original: string
        }[] = meal.extendedIngredients;
        const nutrition: {
            nutrients: {
                name: string
                amount: number
            }[] 
        } = meal.nutrition;
      
        return <MealCard key={id} readyIn={readyIn} index={index} id={id} title={title} image={image} nutrition={nutrition} ingredients={ingredients}/>
    })

  return (
    <Box>
        <Box p={5} width={{md: '70%'}} m='auto'>
            <Typography variant='h3' pb={5} align='center'>
                Find the right plan for you
            </Typography>
            <Typography variant='body1' align='center' lineHeight={2.5} pb={4}>
                Q-Kitchen creates personalized meal plans based on your food preferences, budget, and schedule. Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists and more. Create your meal plan right here in seconds.
            </Typography>
            <Typography variant='h6' align='center' pb={1}>
                Ready to try it out? let us know your diet
            </Typography>

            <Paper sx={{width:'auto', p:2, m:2}}  >
                <Stack spacing={4} alignItems='center' justifyContent='center'>
                    <StyledToggleButtonGroup sx={{flexWrap: 'wrap', justifyContent: 'center'}} size='large' exclusive value={diet} onChange={handleDiet} aria-label="diet selection" >
                        <ToggleButton value='Anything' >Anything</ToggleButton>
                        <ToggleButton value='Ketogenic' >Ketogenic</ToggleButton>
                        <ToggleButton value='Vegetarian' >Vegetarian</ToggleButton>
                        <ToggleButton value='Vegan' >Vegan</ToggleButton>
                        <ToggleButton value='Paleo' >Paleo</ToggleButton>
                        <ToggleButton value='Pescetarian' >Pescetarian</ToggleButton>
                    </StyledToggleButtonGroup>

                    <Box sx={{ width: 250 }}>
                        <Typography id="input-slider" gutterBottom>
                            Daily Calories
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Slider
                                    min={1000}
                                    max={5000}
                                    value={typeof cals === 'number' ? cals : 1000}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"
                                />
                            </Grid>

                            <Grid item>
                                <Input
                                    value={cals}
                                    size="small"
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                        step: 100,
                                        min: 1000,
                                        max: 5000,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Button variant='contained' onClick={generate}>
                        Generate
                    </Button>
                </Stack>
            </Paper>
        </Box>
        <Box p={5} width={{md: '90%'}} m='auto'>
            <Stack spacing={2} direction='row' justifyContent='space-around'>
                {mealPlan.length == 3 &&

                <Box >
                    <Stack spacing={2}>
                        <Typography variant='h6'>
                            Today's meal plan
                        </Typography>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <HtmlTooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            arrow
                            placement='bottom'
                            title={
                                <React.Fragment>
                                    <Chart
                                        chartType="PieChart"
                                        data={percent}
                                        options={options2}
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </React.Fragment>
                            }>
                                <Button onClick={open ? handleTooltipClose : handleTooltipOpen} sx={{width:'100%', justifyContent: 'left'}} variant='outlined' >
                                    <Chart
                                        chartType="PieChart"
                                        data={percent}
                                        options={options}
                                        width={"50px"}
                                        height={"50px"}
                                    />
                                    {nut.calories} 
                                    <Typography pl={0.5} variant='button'>calories</Typography>
                                    
                                </Button>
                            </HtmlTooltip>
                        </ClickAwayListener>
                        <Stack spacing={2}>
                            {mealList}
                        </Stack>
                    </Stack>
                </Box>
                }
                <Divider orientation="vertical"/>
                <Stack width='100%' alignItems='center' justifyContent='center'>
                    <Stack width='70%' spacing={2} alignItems='center' justifyContent='end'>
                        <Box mb={4} width='100%'>
                            <Typography sx={{py: 1}} variant='h5'>
                                Try us Out
                            </Typography>
                            <Typography variant='body2'>
                                Try a free account with us. Discover a multitude of delightful recipes, explore enticing restaurants, and embrace our innovative fitness program. 
                            </Typography>
                        </Box>
                        <Button sx={{width: '100%'}} variant='contained'>
                            Sign in With Facebook
                        </Button>
                        <Button sx={{width: '100%'}} variant='contained'>
                            Sign in With Google
                        </Button>
                        <Button onClick={handleClick} sx={{width: '100%'}} variant='contained'>
                            Sign in With Email
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    </Box>
  )
}

