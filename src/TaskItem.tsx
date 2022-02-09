import React, {FC} from 'react';
import {Button, Checkbox, IconButton, Paper, Typography} from '@mui/material';
import {TaskType} from './App';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

type TaskItemPropsType = {
    id: string
    title: string
    completed: boolean
    removeTask: (id: string) => void
    changeTaskCompleted: (id: string) => void
}

export const TaskItem: FC<TaskItemPropsType> = (
    {
        id,
        title,
        completed,
        removeTask,
        changeTaskCompleted
    }
) => {
    // Functions
    const handlerChange = () => {
        changeTaskCompleted(id)
    }
    // Functions
    const handlerClick = () => {
        removeTask(id)
    }
    return (
        <Paper className={'flexBetween p10 m5'} elevation={3}>
            <Checkbox
                color={'warning'}
                checked={completed}
                onChange={handlerChange}
            />
            <Typography variant={'subtitle1'}>
                {title}
            </Typography>
            <IconButton color={'warning'} onClick={handlerClick}>
                <HighlightOffSharpIcon/>
            </IconButton>
        </Paper>
    );
};

