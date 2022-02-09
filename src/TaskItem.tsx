import React, {FC} from 'react';
import {Button, Checkbox, IconButton, Paper, Typography} from '@mui/material';
import {TaskType} from './App';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import {EditableSpan} from './EditableSpan';

type TaskItemPropsType = {
    id: string
    title: string
    completed: boolean
    removeTask: (id: string) => void
    changeTaskCompleted: (id: string) => void
    changeTaskTitle: (id: string, title: string) => void
}

export const TaskItem: FC<TaskItemPropsType> = (
    {
        id,
        title,
        completed,
        removeTask,
        changeTaskCompleted,
        changeTaskTitle
    }
) => {
    // Functions
    const handlerChange = () => changeTaskCompleted(id)
    const handlerClickButton = () => removeTask(id)
    const handlerClickSpan = (title: string) => changeTaskTitle(id, title)

    return (
        <Paper className={'flexBetween p10 m5'} elevation={3}>
            <Checkbox
                color={'warning'}
                checked={completed}
                onChange={handlerChange}
            />
            <EditableSpan title={title} callBack={handlerClickSpan}/>
            <IconButton color={'warning'} onClick={handlerClickButton}>
                <HighlightOffSharpIcon/>
            </IconButton>
        </Paper>
    );
};

