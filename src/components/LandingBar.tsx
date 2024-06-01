import { AppBar, Container, Tab, Tabs, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';

interface StyledTabProps {
    label: string;
}
  
const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
    }),
);

type PageProp = {
    setPage: React.Dispatch<React.SetStateAction<any>>
    page?: number
}

export function LandingBar({setPage,  page}: PageProp) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
    }

    return (
        <AppBar position='static'>
            <Container >
                <Toolbar>
                    <FastfoodOutlinedIcon color='info' sx={{ display:{ xs:'none', sm:'flex'}}} fontSize='large' />
                    <Typography mr={2} variant="h4" sx={{
                        ml: 2,
                        fontSize: 'large',
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}>
                        <Link style={{textDecoration: 'none', color:'#362417'}} to="/home">Q-Kitchen</Link>
                    </Typography>
                    <Tabs textColor="inherit" value={page} onChange={handleChange} sx={{flexGrow: 1}} >
                        <AntTab label="Try It Out" />
                        <AntTab label="Meal Planning" />
                    </Tabs>
                    <Button variant="contained" color='secondary'>
                        <Link className='btn_txt' to="/signup">
                            Sign up
                        </Link>
                    </Button>
                </Toolbar>
            </Container>  
        </AppBar>
    )
}

export default LandingBar;