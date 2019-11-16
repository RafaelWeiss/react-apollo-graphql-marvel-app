import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import apolloSetup from './apolloSetup';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const { waitOnCache, client } = apolloSetup();

waitOnCache.then(() => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        document.getElementById('root')
    );
});

serviceWorker.unregister();
