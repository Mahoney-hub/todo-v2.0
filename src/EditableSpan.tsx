import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {TextField, Typography} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        callBack
    }
) => {
    const [newTitle, setNewTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)
    // Functions
    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        callBack(newTitle)
    }
    const handlerKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') offEditMode()
    }
    return (
        editMode
            ? <TextField variant={'standard'}
                         size={'small'}
                         autoFocus
                         value={newTitle}
                         onChange={handlerChange}
                         onBlur={offEditMode}
                         onKeyPress={handlerKeyPress}
            />
            : <Typography variant={'subtitle1'}
                          onDoubleClick={onEditMode}
            >
                {title}
            </Typography>
    );
};

