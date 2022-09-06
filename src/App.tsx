import React, {useEffect} from 'react'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import {Navigate, Route, Routes} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {initializeAppTC, logoutTC} from './redux/reducers/auth-reducer';
import {useAppDispatch, useAppSelector} from './redux/store';
import {TodolistsList} from './components/TodolistsList/TodolistsList';
import {Login} from './pages/Login';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';

function App() {
    const status = useAppSelector(state => state.app.status)
    const isInitialize = useAppSelector(state => state.app.isInitialize)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialize) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            {status === 'loading' && <LinearProgress/>}

            {/*<header className={'header'}>*/}
            {/*    {isLoggedIn*/}
            {/*        ? <Button variant={'contained'} color={'secondary'} size={'small'} onClick={logoutHandler}>*/}
            {/*            Log out</Button>*/}
            {/*        : <Button variant={'contained'} color={'secondary'} size={'small'}>Login</Button>*/}
            {/*    }*/}
            {/*</header>*/}
            <Routes>
                <Route path="/" element={<TodolistsList/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    )
}

export default App
