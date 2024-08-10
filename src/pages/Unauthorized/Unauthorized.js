import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function NotFound() {    
    const navigate = useNavigate();
    const {value} = useSelector(state => state.loginReducer);
        
    useEffect(() => {
        if (value?.level < 3) {
            navigate('/');
        }        
    // eslint-disable-next-line
    }, [value]);

    if(value?.level>=3) return <Outlet />
}
