import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {Typography} from '@mui/material';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const handlerKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') activateViewMode()
    }

    return editMode
        ? <TextField variant={'standard'}
                     size={'small'}
                     value={title}
                     onChange={changeTitle}
                     onBlur={activateViewMode}
                     onKeyPress={handlerKeyPress}
                     autoFocus
        />
        : <Typography variant={'subtitle1'} onDoubleClick={activateEditMode}>{props.value}</Typography>
});
