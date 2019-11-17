import { ApolloClient } from 'apollo-client';
import { concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RetryLink } from 'apollo-link-retry';
import { persistCache } from 'apollo-cache-persist';
import resolvers from './graphql/resolvers';

const apolloSetup = () => {
    const retry = new RetryLink({ attempts: { max: Infinity } });
    const http = new HttpLink({ uri: 'https://api.marvelql.com/' });
    const link = concat(retry, http);
    const cache = new InMemoryCache();
    const storage = window.localStorage;
    const waitOnCache = persistCache({ cache, storage });

    const client = new ApolloClient({
        cache,
        link,
        resolvers
    });

    return { waitOnCache, client };
};

export default apolloSetup;
