import { Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AuthToken } from "../../auth/AuthToken";
import { Typography } from "@mui/material";

const Header = () => {

    const history = useHistory();
    const handleLogout = () => {
        AuthToken.set('');
        AuthToken.setCurrentUser(null);
        history.push('/login');
    }

    return (
        <>
        <Stack sx={{ position: 'absolute', top: 20, right: 50 }} alignItems="center" justifyContent="center">
            <Typography alignItems="center">Kylen</Typography>
            <Button sx={{ fontSize: 12, color: "#000000", textDecoration: 'underline' }} onClick={handleLogout}>
                Log Out
            </Button>
        </Stack>
        </>
    );
};

export default Header;
