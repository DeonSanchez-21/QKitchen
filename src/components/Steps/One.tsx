import { Box, TextField } from '@mui/material'
import React from 'react'
import { auth } from '../../firebase' 


const One = () => {
    auth.onAuthStateChanged(user => {
        console.log(user)
    })
  return (
    <Box>
        <TextField id="outlined-basic" label="hello" variant="outlined" />
    </Box>
  )
}

export default One