import Button from '@mui/material/Button';
import {useMsal} from "@azure/msal-react"

export const SignOutButton = () => {
const {instance} = useMsal();

const handleSignOut = () => {
    instance.logoutRedirect("http://localhost:3000");
}

    return (
        <Button onClick={handleSignOut} color="inherit">Sign out</Button>
    )
};