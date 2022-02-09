import React, {FC} from 'react';
import {Paper} from '@mui/material';
import {Heading} from './Heading';
import {Tasks} from './Tasks';
import {FilterValueType, TaskType} from './App';
import {ButtonFilters} from './ButtonFilters';
import {AddItemForm} from './AddItemForm';

type TodoPropsType = {
    id: string
    title: string
    filter: FilterValueType
    task: TaskType[]
    removeTodoList: (id: string) => void
    addTask: (id: string, title: string) => void
    removeTask: (idTodo: string, idTask: string) => void
    changeTaskCompleted: (idTodo: string, idTask: string) => void
    changeTodoListFilter: (id: string, filter: FilterValueType) => void
    changeTaskTitle: (idTodo: string, idTask: string, title: string) => void
}

export const Todo: FC<TodoPropsType> = (
    {
        id,
        title,
        filter,
        task,
        removeTodoList,
        addTask,
        removeTask,
        changeTaskCompleted,
        changeTodoListFilter,
        changeTaskTitle
    }
) => {
    // Functions
    const handlerRemoveTodo = () => removeTodoList(id)
    const handlerAddTask = (title: string) => addTask(id, title)
    const handlerRemoveTask = (idTask: string) => removeTask(id, idTask)
    const handlerChangeTaskCompleted = (idTask: string) => changeTaskCompleted(id, idTask)
    const handlerChangeTodoListFilter = (filter: FilterValueType) => changeTodoListFilter(id, filter)
    const handlerChangeTaskTitle = (idTask: string, title: string) => {
        changeTaskTitle(id, idTask, title)
    }
    return (
        <Paper elevation={0}>
            <Heading title={title} callBack={handlerRemoveTodo}/>
            <AddItemForm callBack={handlerAddTask}/>
            <Tasks task={task}
                   removeTask={handlerRemoveTask}
                   changeTaskCompleted={handlerChangeTaskCompleted}
                   changeTaskTitle={handlerChangeTaskTitle}
            />
            <ButtonFilters filter={filter} changeTodoListFilter={handlerChangeTodoListFilter}/>
        </Paper>
    );
};

