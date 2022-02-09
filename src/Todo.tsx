import React, {FC} from 'react';
import {Paper} from '@mui/material';
import {Heading} from './Heading';
import {Tasks} from './Tasks';
import {TaskType} from './App';
import {ButtonFilters} from './ButtonFilters';
import {AddItemForm} from './AddItemForm';

type TodoPropsType = {
    id: string
    title: string
    task: TaskType[]
    removeTodoList: (id: string) => void
}

export const Todo: FC<TodoPropsType> = (
    {
        id,
        title,
        task,
        removeTodoList
    }
) => {
    // Functions
    const handlerRemoveTodo = () => {
        removeTodoList(id)
    }
    return (
        <Paper elevation={0}>
            <Heading title={title} callBack={handlerRemoveTodo}/>
            <AddItemForm callBack={() => {
            }}/>
            <Tasks task={task}/>
            <ButtonFilters/>
        </Paper>
    );
};

