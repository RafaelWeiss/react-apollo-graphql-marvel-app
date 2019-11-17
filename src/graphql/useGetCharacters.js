import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const GET_CHARACTERS = gql`
    query GetCharacters {
        characters {
            id
            name
            thumbnail
        }
    }
`;

export default () => useQuery(GET_CHARACTERS);
