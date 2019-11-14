import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Jumbotron } from 'reactstrap';
import AppContainer from '../components/layout/AppContainer';

function CharacterPage(props) {
    const { match } = props;

    let character = {};

    const GET_CHARACTER = gql`
        query GetCharacters {
          characters(where: {id: ${match.params.id}}) {
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

    const { loading, data } = useQuery(GET_CHARACTER);

    if (!loading) {
        character = data ? data.characters[0] : {};
    }

    return (
        <AppContainer loading={loading}>
            {data && (
                <Jumbotron>
                    <h1 className="display-3">{character.name}</h1>
                    <hr className="my-2" />
                    <p>{character.description}</p>
                    <p className="lead">&nbsp;</p>
                </Jumbotron>
            )}
        </AppContainer>
    );
}

CharacterPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default CharacterPage;
