import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ToastContainer } from 'react-toastify';
import App from './App';
import apolloSetup from './apolloSetup';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

const { waitOnCache, client } = apolloSetup();

waitOnCache.then(() => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
            <ToastContainer autoClose={1800} hideProgressBar />
        </ApolloProvider>,
        document.getElementById('root')
    );
});

serviceWorker.unregister();
