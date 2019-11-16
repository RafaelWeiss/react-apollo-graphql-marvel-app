import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const query = gql`
    query GetCharacters {
        characters {
            id
            name
            thumbnail
        }
    }
`;

export default () => useQuery(query);
