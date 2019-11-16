import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { CardDeck, Row, Col, Alert } from 'reactstrap';
import AppContainer from '../components/layout/AppContainer';
import InputContainer from '../components/form/InputContainer';
import useGetCharacters from '../grapql/useGetCharacters';
import CharacterCard from './components/CharacterCard';

function CharacterList() {
    const [searchTerms, setSearchTerms] = useState(``);
    const [characters, setCharacters] = useState([]);
    const { loading, data } = useGetCharacters();

    React.useEffect(() => {
        if (data) {
            setCharacters(data.characters);
        }
    }, [data]);

    function search(event) {
        setSearchTerms(event.target.value);
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
                    label="Search"
                    value={searchTerms}
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
                                    <CharacterCard character={character} />
                                </Link>
                            </Col>
                        ))}
                        {_.isEmpty(characters) && (
                            <Col md={12}>
                                <Alert color="secondary">No records found!</Alert>
                            </Col>
                        )}
                    </Row>
                </CardDeck>
            )}
        </AppContainer>
    );
}

export default CharacterList;
