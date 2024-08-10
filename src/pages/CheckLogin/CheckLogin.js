import { Outlet } from "react-router-dom";
import { checkLogin } from "../../services/auth";
import { useDispatch } from "react-redux"
import { checkUser } from "../../actions/login";

export default function CheckLogin(){
    const dispatch = useDispatch()
    const check = async () => {
        const res = await checkLogin()
        
        dispatch(checkUser(res))
    }
    check()
    return(
        <>
            <Outlet />
        </>
    )
}