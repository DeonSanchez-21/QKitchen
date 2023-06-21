import { Box } from "@mui/system";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FullScreenCard } from "../../components/FullScreenCard";
import "../../App.css"

export function AuthLayout() {
    const location = useLocation();
    const inLogin = location.pathname === '/'
    return (
    <FullScreenCard>
        <FullScreenCard.Body>
            <Outlet/>
        </FullScreenCard.Body>
        <FullScreenCard.BelowCard>
            <Box className='center'>
                <Link to={inLogin ? '/signup' : '/'}>
                    {inLogin ? 'Create Account' : 'Login'}
                </Link>
            </Box>
        </FullScreenCard.BelowCard>
    </FullScreenCard>
    )
}