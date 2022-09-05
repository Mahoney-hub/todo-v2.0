import React, {ChangeEvent, useCallback} from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from '../../api/api';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import Paper from '@mui/material/Paper';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return (
        <Paper key={props.task.id} className={'task'} elevation={3}>
                <Checkbox
                    checked={props.task.status === TaskStatuses.Completed}
                    color="primary"
                    onChange={onChangeHandler}
                />

                <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
                <IconButton onClick={onClickHandler} color={'error'}>
                    <HighlightOffIcon/>
                </IconButton>
        </Paper>
    )
})
