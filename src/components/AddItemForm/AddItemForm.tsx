import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return (
    <Box className={'add-item-form'}>
        <TextField variant={'standard'}
                   color={'primary'}
                   size={'small'}
                   disabled={disabled}
                   placeholder={'Напиши название...'}
                   fullWidth
                   value={title}
                   error={!!error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
        />
        <Button variant={'contained'}
                color={'secondary'}
                size={'small'}
                onClick={addItemHandler}
                disabled={disabled}
        >
            +
        </Button>
    </Box>
)})
