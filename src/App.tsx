import React, {useState} from 'react';
import {v1} from 'uuid';
import {NavBar} from './NavBar';
import {Grid, ThemeProvider} from '@mui/material';
import {styleApp} from './styles/styleApp';
import {AddItemForm} from './AddItemForm';
import {Todo} from './Todo';

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
            {id: v1(), title: 'английский', completed: false},
            {id: v1(), title: 'HTML', completed: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'хлеб', completed: false},
            {id: v1(), title: 'молоко', completed: false}
        ],
        [todoListID3]: [
            {id: v1(), title: 'заняться учебой', completed: false},
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
    // Components before rendering
    const componentTodoList = todoList.map(todo => {
        return (
            <Grid item className={'w400'} key={todo.id}>
                <Todo id={todo.id}
                      title={todo.title}
                      task={tasks[todo.id]}
                      removeTodoList={removeTodoList}
                />
            </Grid>
        )
    })

    return (
        <>
            <ThemeProvider theme={styleApp}>
                <NavBar/>
                <AddItemForm callBack={addTodoList}/>
                <Grid container spacing={4} justifyContent={'center'}>
                    {componentTodoList}
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default App;

