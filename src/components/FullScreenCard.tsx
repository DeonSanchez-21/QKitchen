import { Box, Typography, Paper } from '@mui/material'
import { ReactNode } from 'react'
import '../App.css'

type FullScreenCardProps = {
    children: ReactNode
}


export function FullScreenCard({ children }: FullScreenCardProps){
    return (
    <Box className='center' sx={{backgroundColor: '#e0e0e0', height: '100vh', width: '100%', margin: '0'}}>
        <div >{children}</div>
    </Box>) 
}

FullScreenCard.AboveCard = function({children} : FullScreenCardProps){
    return  <Box m={2}>{children}</Box>
}

FullScreenCard.Body =  function({children } : FullScreenCardProps) {
    return <Paper className='center' sx={{width: '350px', height: 'auto', flexDirection: 'column', paddingBottom: "1.5rem"}}>{children}</Paper>
}

FullScreenCard.BelowCard =  function({children } : FullScreenCardProps) {
    return <Typography >{children}</Typography>
}