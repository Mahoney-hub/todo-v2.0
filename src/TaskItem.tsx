import React, {FC} from 'react';
import {Button, Checkbox, IconButton, Paper, Typography} from '@mui/material';
import {TaskType} from './App';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

type TaskItemPropsType = {
    id: string
    title:string
    completed:boolean
}

export const TaskItem: FC<TaskItemPropsType> = (
    {
        id,
        title,
        completed
    }
) => {
    // Functions
    const handlerChange = () => {

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
            <IconButton color={'warning'}>
                <HighlightOffSharpIcon/>
            </IconButton>
        </Paper>
    );
};

