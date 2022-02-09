import React, {FC} from 'react';
import {TaskType} from './App';
import {TaskItem} from './TaskItem';

type TasksPropsType = {
    task: TaskType[]
    removeTask: (idTask: string) => void
    changeTaskCompleted: (idTask: string) => void
}

export const Tasks: FC<TasksPropsType> = (
    {
        task,
        removeTask,
        changeTaskCompleted
    }
) => {
    // Components before rendering
    const componentList = task.map(t => {
        return (
            <TaskItem key={t.id}
                      {...t}
                      removeTask={removeTask}
                      changeTaskCompleted={changeTaskCompleted}
            />
        )
    })
    return (
        <div className={'mv20'}>
            {componentList}
        </div>
    );
};

