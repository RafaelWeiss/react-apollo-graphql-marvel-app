import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const GET_CHARACTER_BY_ID = gql`
    query GetCharacter($id: Int!) {
        characters(where: { id: $id }) {
            id
            name
            description
            thumbnail
            series {
                name
            }
        }
    }
`;

export default ({ id }) => {
    const { loading, data } = useQuery(GET_CHARACTER_BY_ID, {
        variables: { id: parseInt(id, 10) }
    });
    return { loading, data };
};
