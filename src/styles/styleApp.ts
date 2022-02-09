import {createTheme} from '@mui/material/styles';
import {blueGrey, red} from '@mui/material/colors';

export const styleApp = createTheme({
    palette: {
        primary: {
            main: blueGrey[700],
        },
        secondary: {
            main: blueGrey[900],
        },
        success: {
            main: '#3AAFA9',
        },
        info: {
            main: '#E7EBF0',
        },
        warning: {
            main: red[400],
        }
    },
});