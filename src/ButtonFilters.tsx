import {Button, ButtonGroup } from '@mui/material';
import React from 'react';

type ButtonFiltersPropsType = {

}

export const ButtonFilters = (
    {

    }
) => {
    return (
        <ButtonGroup variant="contained" fullWidth>
            <Button>all</Button>
            <Button>active</Button>
            <Button>completed</Button>
        </ButtonGroup>
    );
};

