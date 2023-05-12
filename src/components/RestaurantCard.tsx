import {useState} from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, CardHeader, Stack, Chip,CardActions, styled, Collapse } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

type KeyProps = {
    name: string;
    lon: string;
    lat: string;
    number: string;
    image: string;
    address: string;
    isOpen: boolean;
    delivery: boolean;
    distance: string;
}
export function RestaurantCard(props: KeyProps) {
    const miles = Math.round(parseFloat(props.distance) * 10) / 10;

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    function formatPhoneNumber(phoneNumberString: string) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '');
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    const phone = formatPhoneNumber(props.number);

    return (
    <Grid xs={12} sm={6} lg={4} item>
        <Card sx={{position: 'relative'}}>
            <CardHeader 
                title={props.name?.length >= 25 ? props.name.slice(0, 35) + "..." : props.name}
                subheader={`${miles} ${miles !== 1 ? 'Miles' : 'Mile'}`}
            />
            
            <CardMedia 
                component="img"
                height='200px'
                image={props.image}
            />

            <CardActions>
                <Stack spacing={1} direction='row'>
                    <Chip
                    label={props.isOpen? 'Open' : 'Closed'}
                    color={props.isOpen? 'success' : 'error'}/>

                   {props.delivery && <Chip
                    label='Delivery'
                    color='primary'/>}
                </Stack>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Stack spacing={1} pb={1} direction={{xs:'row', sm:'column', md: 'row'}} >
                            <Typography variant='subtitle1' fontWeight='bold'>
                                Address:
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', justifyContent:'left'}} variant='subtitle1' >
                                {props.address}
                            </Typography>
                        </Stack>
                        <Stack spacing={1} pb={2} direction={{xs:'row', sm:'column', md: 'row'}}>
                            <Typography variant='subtitle1' fontWeight='bold'>
                                Phone Number:
                            </Typography>
                            <Typography sx={{display:'flex', alignItems:'center', justifyContent:'left'}} variant='subtitle1' >
                                {phone}
                            </Typography>
                        </Stack>
                        
                        <iframe src={`https://maps.google.com/maps?q=${parseFloat(props.lat)},${parseFloat(props.lon)}&hl=es;&output=embed`} style={{border:0}} height='150px' width='100%'></iframe>
                    </CardContent>
            </Collapse>
        </Card>
    </Grid>
  )
}
