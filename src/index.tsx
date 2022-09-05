import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import {ThemeProvider} from '@mui/material';
import {styleApp} from './styles/styleApp';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <ThemeProvider theme={styleApp}>
                <App/>
            </ThemeProvider>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);

