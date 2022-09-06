import React, {useEffect} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import {LinearProgress} from '@mui/material';
import {initializeAppTC} from './redux/reducers/auth-reducer';
import {useAppDispatch, useAppSelector} from './redux/store';
import {TodolistsList} from './components/TodolistsList/TodolistsList';
import {Login} from './pages/Login/Login';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import Box from '@mui/material/Box';
import {Selection} from './pages/Selection/Selection';

function App() {
    const isInitialize = useAppSelector(state => state.app.isInitialize)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialize) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Routes>
                <Route path="/" element={<TodolistsList/>}/>
                <Route path='selection' element={<Selection/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    )
}

export default App
