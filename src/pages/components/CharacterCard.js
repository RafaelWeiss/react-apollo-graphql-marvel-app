import React from 'react';
import PropTypes from 'prop-types';
import { Media, Card, CardTitle, CardBody } from 'reactstrap';

function CharacterCard(props) {
    const { character } = props;
    return (
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
    );
}

CharacterCard.propTypes = {
    character: PropTypes.object.isRequired
};

export default CharacterCard;
