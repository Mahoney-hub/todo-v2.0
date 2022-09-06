import React from 'react';
import Button from '@mui/material/Button';
import {loginTC} from '../../redux/reducers/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Navigate, useNavigate} from 'react-router-dom';

export const Selection = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onMainHandler = () => {
        dispatch(loginTC({email: 'pv9998286620@yandex.ru', password: '1234ASDF', rememberMe: false}))
    }

    const onLoginHandler = () => {
        navigate('/login')
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'selection'}>
            <Button variant={'contained'} size={'large'} onClick={onMainHandler}>вход для hr</Button>
            <Button variant={'contained'} size={'large'} onClick={onLoginHandler}>зарегистрированные</Button>
        </div>
    );
};

