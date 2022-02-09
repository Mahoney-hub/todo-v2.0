import {Button, ButtonGroup} from '@mui/material';
import React, {FC, MouseEvent} from 'react';
import {FilterValueType} from './App';

type ButtonFiltersPropsType = {
    filter: FilterValueType
    changeTodoListFilter: (filter: FilterValueType) => void
}

export const ButtonFilters: FC<ButtonFiltersPropsType> = (
    {
        filter,
        changeTodoListFilter
    }
) => {
    // Functions
    const handlerClick = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value
        const condition = (value === 'all' || value === 'active' || value === 'completed')
        if (condition) changeTodoListFilter(value)
    }
    return (
        <ButtonGroup variant="contained" fullWidth>
            <Button value={'all'}
                    onClick={handlerClick}
                    color={(filter === 'all') ? 'secondary' : 'primary'}
            >
                all
            </Button>
            <Button value={'active'}
                    onClick={handlerClick}
                    color={(filter === 'active') ? 'secondary' : 'primary'}
            >
                active
            </Button>
            <Button value={'completed'}
                    onClick={handlerClick}
                    color={(filter === 'completed') ? 'secondary' : 'primary'}
            >
                completed
            </Button>
        </ButtonGroup>
    );
};

