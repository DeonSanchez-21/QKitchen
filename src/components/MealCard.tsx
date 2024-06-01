import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Paper, Typography, styled, Stack, Button, Divider, Tooltip, Menu, IconButton, MenuItem, TooltipProps, tooltipClasses, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { Ingredients, KeyProp } from '../types/types';
import CloseIcon from '@mui/icons-material/Close';
import { fetchData } from '../utils/fetchData';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      padding: '10px',
    },
}));

const MealCard = (props: KeyProp) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [recipeCard, setRecipeCard] = useState('');
  const open = Boolean(anchorEl);

  const getRecipeCard = async() => {
    const data = await fetchData(`https://api.spoonacular.com/recipes/${props.id}/card?apiKey=90eac845919f468a927fd33e482f15e5`)
    console.log(data)
    setRecipeCard(data.url)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDialogClickOpen = () => {
    setDialogOpen(true); 
    recipeCard === '' && getRecipeCard()   
  }; 

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=> {
    
  },[])

  const ingredientsList = props.ingredients.slice(0, 5).map((item: { original: string }) => {
    return <Typography lineHeight={1.1} variant='subtitle2' sx={{m:0.7}}>{item.original}</Typography>
  })

  return (
    <Paper elevation={1} sx={{p:1, width:'500px' }} >
        <Stack p={1} > 
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Box pb={2}>
              <Typography variant='h5' >
                {props.index === 0 && 'Breakfast'}
                {props.index === 1 && 'Lunch'}
                {props.index === 2 && 'Dinner'}
              </Typography>

              <Typography variant="subtitle2">
                {`${props.nutrition.nutrients[0].amount} Calories`}
              </Typography>
            </Box>

            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon/>
            </IconButton>

            <Menu 
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Menu>

          </Stack>

          <HtmlTooltip
            arrow
            placement='right'
            title={
              <React.Fragment>
                <Typography sx={{pb:1}} color="inherit" variant='h6' lineHeight={1.25}>{props.title}</Typography>
                {`Ready In ${props.readyIn} Minutes`} 

                <Divider sx={{my: 1}}/>

                <Typography variant='subtitle1'>Per Serving</Typography>
                <Stack >
                  <Stack width='80%' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle2'>Calories</Typography>
                    {`${props.nutrition.nutrients[0].amount}`}
                  </Stack>
                  <Stack width='80%' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle2'>Protein</Typography>
                    {`${props.nutrition.nutrients[8].amount}g`}
                  </Stack>
                  <Stack width='80%' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle2'>Carbs</Typography>
                    {`${props.nutrition.nutrients[3].amount}g`}
                  </Stack>
                  <Stack width='80%' direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle2'>Fat</Typography>
                    {`${props.nutrition.nutrients[1].amount}g`}
                  </Stack>
                </Stack>

                <Divider sx={{my:1}}/>

                {ingredientsList}
              </React.Fragment>
            }
          >
            <Stack direction='row'>
              <Stack spacing={2} alignItems='center' direction='row'>
                <img className="try_meal_plan_img hover" src={props.image} onClick={handleDialogClickOpen}/>
                <Typography variant='subtitle1' className='hover' onClick={handleDialogClickOpen}>
                  {props.title?.length >= 30 ? props.title.slice(0, 35) + "..." : props.title}
                </Typography>
              </Stack>
              <BootstrapDialog
                onClose={handleDialogClose}
                aria-labelledby="customized-dialog-title"
                open={dialogOpen}
                sx={{zIndex: 2000}}
              >
                <img src={recipeCard}/>
              </BootstrapDialog>
            </Stack>
          </HtmlTooltip>
        </Stack>
    </Paper>
  )
}

export default MealCard