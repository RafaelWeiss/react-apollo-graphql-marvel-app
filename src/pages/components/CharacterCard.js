import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardBody } from 'reactstrap';
import ImageContainer from '../../components/layout/ImageContainer';

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
            <ImageContainer
                src={character.thumbnail}
                width="275"
                height="275"
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
