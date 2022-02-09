import React, {FC} from 'react';
import {TaskType} from './App';
import {TaskItem} from './TaskItem';

type TasksPropsType = {
    task: TaskType[]
}

export const Tasks: FC<TasksPropsType> = (
    {
        task
    }
) => {
    // Components before rendering
    const componentList = task.map(t => <TaskItem key={t.id} {...t}/>)
    return (
        <div className={'mv20'}>
            {componentList}
        </div>
    );
};

