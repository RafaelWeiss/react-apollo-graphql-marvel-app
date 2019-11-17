import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const query = gql`
    mutation($key: key, $name: name, $description: description) {
        saveCharacter(key: $key, name: $name, description: $description) @client
    }
`;

export default () => useMutation(query);
