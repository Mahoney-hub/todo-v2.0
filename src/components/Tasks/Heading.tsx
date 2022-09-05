import React, {FC} from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

type HeadingPropsType = {
    title: string
    callBack: () => void
}

export const Heading: FC<HeadingPropsType> = (
    {
        title,
        callBack
    }
) => {
    // Functions
    return (
        <Box className={'flexBetween todo-title'}>
            <Typography variant={'h6'}>
                {title}
            </Typography>
            <IconButton color={'secondary'} onClick={callBack}>
                <DeleteForeverRoundedIcon/>
            </IconButton>
        </Box>
    );
};

