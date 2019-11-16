import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Media, Card, CardTitle, CardDeck, CardBody, Row, Col } from 'reactstrap';
import AppContainer from '../components/layout/AppContainer';
import InputContainer from '../components/form/InputContainer';
import useGetCharacters from '../grapql/useGetCharacters';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const { loading, data } = useGetCharacters();

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
                <InputContainer
                    onChange={search}
                    name="search"
                    id="search"
                    label="Search"
                    placeholder="Search Characters"
                    showlabel={false}
                    style={{ width: '250px', float: 'right' }}
                />
            }>
            {data && (
                <CardDeck>
                    <Row style={{ width: '100%', marginLeft: '0px' }}>
                        {characters.map((character) => (
                            <Col lg={4} md={4} sm={12} xl={3} key={character.id}>
                                <Link to={`/character/${character.id}`}>
                                    <Card
                                        style={{
                                            width: '275px',
                                            marginBottom: '30px',
                                            marginLeft: '0px',
                                            marginRight: '0px'
                                        }}>
                                        <Media
                                            object
                                            src={character.thumbnail}
                                            style={{ maxWidth: '275px', height: '275px' }}
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
