import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Logout = () => {
    const { logout } = useLogout(); 
    const { user } = useAuthContext();

    return (
        <button onClick={(e) => logout()}>Log out</button>
    )
}

export default Logout;