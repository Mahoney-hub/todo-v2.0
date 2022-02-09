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
    // Functions
    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerClick = () => {
        if (title.trim().length) {
            callBack(title)
            setTitle('')
        }
    }
    const handlerKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handlerClick()
        }
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

