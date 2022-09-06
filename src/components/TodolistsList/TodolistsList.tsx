import React, {useCallback, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../../redux/reducers/tasks-reducer';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
} from '../../redux/reducers/todolists-reducer';
import {Todolist} from './Todolist';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {TaskStatuses} from '../../api/api';
import {Navigate} from 'react-router-dom';
import {AddTodoList} from '../AddTodolist/AddTodoList';
import {logoutTC} from '../../redux/reducers/auth-reducer';
import Button from '@mui/material/Button';

export const TodolistsList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC())
        }
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId))
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId))
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(id, {status}, todolistId))
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return <>
        {/*<Grid container style={{padding: '20px'}}>*/}
        {/*    <AddTodoList addItem={addTodolist}/>*/}
        {/*</Grid>*/}
        <header className={'header'}>
            {isLoggedIn
                ? <>
                    <Button variant={'contained'} color={'secondary'} size={'small'} onClick={logoutHandler}>
                        Log out</Button>
                    <AddTodoList addItem={addTodolist}/>
                </>
                : <Button variant={'contained'} color={'secondary'} size={'small'}>Login</Button>
            }
        </header>
        <Grid container spacing={3} className={''} justifyContent={'center'}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Todolist
                            todolist={tl}
                            tasks={allTodolistTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Grid>
                })
            }
        </Grid>
    </>
}
