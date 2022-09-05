import React, {useState} from 'react';
import {v1} from 'uuid';
import {NavBar} from './components/Tasks/NavBar';
import {Grid} from '@mui/material';
import {AddItemForm} from './components/AddItemForm';
import {Todo} from './components/Todo';

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    completed: boolean
}

type TasksType = {
    [id: string]: TaskType[]
}

const App = () => {
    // BLL
    const todoListID1 = v1()
    const todoListID2 = v1()
    const todoListID3 = v1()
    const [todoList, setTodoList] = useState<TodoType[]>([
        {id: todoListID1, title: 'Что нужно выучить', filter: 'all'},
        {id: todoListID2, title: 'Что нужно купить', filter: 'all'},
        {id: todoListID3, title: 'Что нужно сделать', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
            {id: v1(), title: 'английский', completed: true},
            {id: v1(), title: 'HTML', completed: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'хлеб', completed: false},
            {id: v1(), title: 'молоко', completed: true}
        ],
        [todoListID3]: [
            {id: v1(), title: 'заняться учебой', completed: true},
            {id: v1(), title: 'заняться спортом', completed: false}
        ],
    })
    // Functions
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoType = {id: newTodoListID, title: title, filter: 'all'}
        setTodoList([newTodoList, ...todoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const removeTodoList = (id: string) => {
        setTodoList(todoList.filter(todo => todo.id !== id))
        delete tasks[id]
    }
    const changeTodoListFilter = (id: string, filter: FilterValueType) => {
        setTodoList(todoList.map(todo =>
            (todo.id !== id) ? todo : {...todo, filter: filter}
        ))
    }

    const addTask = (id: string, title: string) => {
        const newTask = {id: v1(), title: title, completed: false}
        setTasks({
            ...tasks,
            [id]: [newTask, ...tasks[id]]
        })
    }
    const removeTask = (idTodo: string, idTask: string) => {
        setTasks({
            ...tasks,
            [idTodo]: tasks[idTodo].filter(task => task.id !== idTask)
        })
    }
    const changeTaskCompleted = (idTodo: string, idTask: string) => {
        setTasks({
            ...tasks,
            [idTodo]: tasks[idTodo].map(task =>
                (task.id !== idTask) ? task : {...task, completed: !task.completed})
        })
    }
    const changeTaskTitle = (idTodo: string, idTask: string, title: string) => {
        setTasks({
            ...tasks,
            [idTodo]: tasks[idTodo].map(task =>
                (task.id !== idTask) ? task : {...task, title: title}
            )
        })
    }

    const getFilteredTasks = (todoList: TodoType) => {
        switch (todoList.filter) {
            case 'active' :
                return tasks[todoList.id].filter(task => !task.completed)
            case 'completed':
                return tasks[todoList.id].filter(task => task.completed)
            default:
                return tasks[todoList.id]
        }
    }
    // Components before rendering
    const componentTodoList = todoList.map(todo => {
        const filteredTasks = getFilteredTasks(todo)
        return (
            <Grid item className={'w400'} key={todo.id}>
                <Todo id={todo.id}
                      title={todo.title}
                      filter={todo.filter}
                      task={filteredTasks}
                      removeTodoList={removeTodoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTaskCompleted={changeTaskCompleted}
                      changeTodoListFilter={changeTodoListFilter}
                      changeTaskTitle={changeTaskTitle}
                />
            </Grid>
        )
    })

    return (
        <>
            <NavBar/>
            <AddItemForm callBack={addTodoList}/>
            <Grid container spacing={4} justifyContent={'center'}>
                {componentTodoList}
            </Grid>
        </>
    );
};

export default App;

