import React, {useCallback, useEffect} from 'react'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Navigate} from 'react-router-dom';
import {FilterValuesType, TodolistDomainType} from '../../redux/reducers/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {TaskStatuses, TaskType} from '../../api/api';
import {Task} from './Task';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {fetchTasksTC} from '../../redux/reducers/tasks-reducer';
import {Box, ButtonGroup, Typography} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Paper from '@mui/material/Paper';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTasksTC(props.todolist.id))
        }
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <Paper elevation={0} className={'todolist'}>
            <Box className={'flexBetween todo-title'}>
                <Typography variant={'h6'}>
                    {props.todolist.title}
                </Typography>
                <IconButton color={'secondary'} onClick={removeTodolist}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </Box>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                    removeTask={props.removeTask}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </div>
            <ButtonGroup variant="contained" fullWidth>
                <Button color={(props.todolist.filter === 'all') ? 'secondary' : 'primary'}
                        onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button color={(props.todolist.filter === 'active') ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button color={(props.todolist.filter === 'completed') ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </ButtonGroup>
        </Paper>
    )
})


