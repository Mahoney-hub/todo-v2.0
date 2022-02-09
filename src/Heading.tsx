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
        <Box className={'flexCenter bgcGrey'}>
            <Typography variant={'h5'}>
                {title}
            </Typography>
            <IconButton color={'info'} onClick={callBack}>
                <DeleteForeverRoundedIcon/>
            </IconButton>
        </Box>
    );
};

