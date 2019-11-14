import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import CharacterList from './pages/CharacterList';
import CharacterPage from './pages/CharacterPage';
import './App.css';

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    link: new HttpLink({ uri: 'https://api.marvelql.com/' }),
    resolvers: {
        Mutation: {
            updateCharacter: (_, args, { cache }) => {
                cache.writeData({
                    id: `Character:${args.key}`,
                    data: {
                        name: `${args.name}`
                    }
                });
                return null;
            }
        }
    }
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Route exact path="/" component={CharacterList} />
                <Route path="/character/:id" component={CharacterPage} />
            </Router>
        </ApolloProvider>
    );
}

export default App;
