import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { CardDeck, Row, Col, Alert, Card, CardTitle, CardBody } from 'reactstrap';
import i18n from '../i18n';
import AppContainer from '../components/layout/AppContainer';
import InputContainer from '../components/form/InputContainer';
import ImageContainer from '../components/layout/ImageContainer';
import useGetCharacters from '../graphql/useGetCharacters';

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
                    placeholder={i18n.t('placeholder.searchCharacters')}
                    showlabel={false}
                    style={{ width: '250px', float: 'right' }}
                />
            }>
            {characters && (
                <CardDeck>
                    <Row style={{ width: '100%' }}>
                        {characters.map((character) => (
                            <Col lg={4} md={4} sm={12} xl={3} key={character.id}>
                                <Link to={`/character/${character.id}`}>
                                    <CharacterCard character={character} />
                                </Link>
                            </Col>
                        ))}
                        {_.isEmpty(characters) && (
                            <Col md={12}>
                                <Alert color="secondary">{i18n.t('msg.noRecordsFound')}</Alert>
                            </Col>
                        )}
                    </Row>
                </CardDeck>
            )}
        </AppContainer>
    );
}

function CharacterCard(props) {
    const { character } = props;
    return (
        <Card className="card-item" style={{}}>
            <ImageContainer
                src={character.thumbnail}
                width="275"
                height="275"
                className="card-item-image"
                alt={character.name}
            />
            <CardBody>
                <CardTitle>{character.name}</CardTitle>
            </CardBody>
        </Card>
    );
}

CharacterCard.propTypes = {
    character: PropTypes.object.isRequired
};

export default CharacterList;
