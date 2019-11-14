import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Input, Card, CardImg, CardTitle, CardDeck, CardBody, Row, Col } from 'reactstrap';
import AppContainer from '../components/layout/AppContainer';

function CharacterList() {
    const [characters, setCharacters] = useState([]);

    const GET_CHARACTERS = gql`
        query GetCharacters {
            characters {
                id
                name
                thumbnail
            }
        }
    `;

    const { loading, data } = useQuery(GET_CHARACTERS);

    React.useEffect(() => {
        if (data) {
            setCharacters(data.characters);
        }
    }, [data]);

    function search(event) {
        const regexp = new RegExp(event.target.value, 'i');
        setCharacters(
            data.characters.filter((character) => {
                const { name } = character;
                return regexp.test(name);
            })
        );
    }

    return (
        <AppContainer
            loading={loading}
            customComponent={
                <Input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="search"
                    onChange={search}
                />
            }>
            {data && (
                <CardDeck>
                    <Row>
                        {characters.map((character) => (
                            <Col sm={3} key={character.id}>
                                <Link to={`/character/${character.id}`}>
                                    <Card>
                                        <CardImg
                                            top
                                            width="100%"
                                            src={character.thumbnail}
                                            alt={character.name}
                                        />
                                        <CardBody>
                                            <CardTitle>{character.name}</CardTitle>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </CardDeck>
            )}
        </AppContainer>
    );
}

export default CharacterList;
