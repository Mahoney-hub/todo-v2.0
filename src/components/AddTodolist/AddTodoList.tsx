import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';

type AddTodoListPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddTodoList = React.memo(function ({addItem, disabled = false}: AddTodoListPropsType) {
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
        <Box className={'add-todolist'}>
            <TextField variant={'outlined'}
                       color={'secondary'}
                       size={'small'}
                       disabled={disabled}
                       label={`Add todo`}
                       fullWidth
                       value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            <Button variant={'contained'}
                    color={'secondary'}
                    size={'large'}
                    onClick={addItemHandler}
                    disabled={disabled}
            >
                add
            </Button>
        </Box>
    )
})
