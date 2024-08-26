import { Outlet, useLocation } from "react-router-dom";
import { checkLogin } from "../../services/auth";
import { useDispatch } from "react-redux"
import { checkUser } from "../../actions/login";
import { useEffect } from "react";

export default function CheckLogin(){
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        const check = async () => {
            const res = await checkLogin()
            dispatch(checkUser(res))
        }
        check()
        // eslint-disable-next-line
    }, [location])
    return(
        <>
            <Outlet />
        </>
    )
}