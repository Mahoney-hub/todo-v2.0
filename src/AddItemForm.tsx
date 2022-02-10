import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (
    {
        callBack
    }
) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    // Functions
    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const handlerClick = () => {
        if (title.trim().length) {
            callBack(title)
            setTitle('')
        } else {
            setError(true)
        }
    }
    const handlerKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') ? handlerClick() : setError(true)
    }
    return (
        <Box className={'flexCenter maxWidth p10'}>
            <TextField variant={'standard'}
                       color={'primary'}
                       size={'small'}
                       placeholder={'Напиши название...'}
                       fullWidth
                       value={title}
                       onChange={handlerChange}
                       onKeyPress={handlerKeyPress}
                       error={error}
            />
            <Button variant={'contained'}
                    color={'warning'}
                    size={'small'}
                    onClick={handlerClick}
            >
                +
            </Button>
        </Box>
    );
};

