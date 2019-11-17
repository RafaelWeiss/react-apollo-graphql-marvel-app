import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Jumbotron, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import i18n from '../i18n';
import AppContainer from '../components/layout/AppContainer';
import ImageContainer from '../components/layout/ImageContainer';
import CharacterForm from './components/CharacterForm';
import useGetCharacterById from '../graphql/useGetCharacterById';

function CharacterPage(props) {
    const { match } = props;
    const [modal, setModal] = useState(false);
    const { loading, data } = useGetCharacterById({ id: match.params.id });
    const toggle = () => setModal(!modal);

    let character = null;
    if (!loading) {
        character = data ? data.characters[0] : {};
    }
    console.log('Character', character);
    return (
        <AppContainer
            loading={loading}
            customComponent={
                <Link to="/" style={{ float: 'right' }}>
                    &lt; back
                </Link>
            }>
            {character && (
                <>
                    <Jumbotron
                        style={{
                            padding: '2rem 2rem'
                        }}>
                        <Row>
                            <Col lg={4} md={12} sm={12} xs={12}>
                                <ImageContainer
                                    src={character.thumbnail}
                                    style={{ maxWidth: 350 }}
                                    alt={character.name}
                                />
                            </Col>
                            <Col>
                                <Button
                                    color="secondary"
                                    onClick={toggle}
                                    style={{ display: 'inline', float: 'right' }}>
                                    {i18n.t('button.edit')}
                                </Button>
                                <h1 className="display-3">{character.name}</h1>
                                <hr className="my-2" />
                                <p>{character.description}</p>
                                <p className="lead">&nbsp;</p>

                                <CharacterSeries character={character} />
                            </Col>
                        </Row>
                    </Jumbotron>
                    <CharacterForm character={character} modal={modal} toggle={toggle} />
                </>
            )}
        </AppContainer>
    );
}

function CharacterSeries(props) {
    const { character } = props;
    return (
        <>
            <h3 className="display-8">:: Series</h3>
            <ListGroup>
                {character.series.map((serie, i) => {
                    return <ListGroupItem key={`serie_${i}`}>{serie.name}</ListGroupItem>;
                })}
            </ListGroup>
        </>
    );
}

CharacterSeries.propTypes = {
    character: PropTypes.object.isRequired
};

CharacterPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default CharacterPage;
