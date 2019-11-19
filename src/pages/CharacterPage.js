import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
    Jumbotron,
    Row,
    Col,
    Button,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Formik } from 'formik';
import Yup from 'yup';
import { toast } from 'react-toastify';
import i18n from '../i18n';
import AppContainer from '../components/layout/AppContainer';
import ImageContainer from '../components/layout/ImageContainer';
import InputContainer from '../components/form/InputContainer';
import ButtonContainer from '../components/form/ButtonContainer';
import useGetCharacterById from '../graphql/useGetCharacterById';
import useSaveCharacter from '../graphql/useSaveCharacter';

function CharacterPage(props) {
    const { match } = props;
    const [modal, setModal] = useState(false);
    const { loading, data } = useGetCharacterById({ id: match.params.id });
    const toggle = () => setModal(!modal);

    let character = null;
    if (!loading) {
        character = data ? data.characters[0] : {};
    }
    return (
        <AppContainer
            loading={loading}
            customComponent={
                <Link to="/" className="app-link-go-back">
                    &lt;&nbsp;
                    {i18n.t('button.goBack')}
                </Link>
            }>
            {character && (
                <>
                    <CharacterInfo character={character} toggle={toggle} />
                    <CharacterForm character={character} toggle={toggle} modal={modal} />
                </>
            )}
        </AppContainer>
    );
}

function CharacterInfo(props) {
    const { character, toggle } = props;
    return (
        <Row style={{ width: '100%' }}>
            <Col lg={4} md={12} sm={12} xs={12} className="jumbotron-item-image-container">
                <ImageContainer
                    src={character.thumbnail}
                    className="jumbotron-item-image"
                    alt={character.name}
                />
            </Col>
            <Col>
                <Jumbotron className="jumbotron-item">
                    <Button
                        color="secondary"
                        onClick={toggle}
                        style={{ display: 'inline', float: 'right' }}>
                        {i18n.t('button.edit')}
                    </Button>
                    <h1 className="display-3 fontWhite">{character.name}</h1>
                    <hr className="my-2 borderWhite" />
                    <p className="fontWhite">{character.description}</p>
                    <p className="lead fontWhite">&nbsp;</p>
                    <CharacterSeries character={character} />
                </Jumbotron>
            </Col>
        </Row>
    );
}

function CharacterForm(props) {
    const { character, modal, toggle } = props;
    const [saveCharacter] = useSaveCharacter();
    return (
        <Formik
            initialValues={{
                key: character.id,
                name: character.name,
                description: character.description
            }}
            onSubmit={(values) => {
                saveCharacter({
                    variables: values
                }).then(() => {
                    toast.success(i18n.t('msg.saveSuccess'), {
                        position: toast.POSITION.TOP_CENTER
                    });
                    toggle();
                });
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required(i18n.t('msg.requiredField'))
            })}>
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
                return (
                    <Form>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                                {i18n.t('title.editCharacter')}
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <InputContainer
                                        label={i18n.t('label.name')}
                                        value={values.name}
                                        onChange={handleChange}
                                        required
                                        errors={errors.name}
                                        name="name"
                                        placeholder="name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <InputContainer
                                        value={values.description}
                                        onChange={handleChange}
                                        errors={errors.description}
                                        label={i18n.t('label.description')}
                                        name="description"
                                        placeholder="description"
                                    />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <ButtonContainer
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    label={i18n.t('button.save')}
                                />
                                <ButtonContainer
                                    color="secondary"
                                    onClick={toggle}
                                    label={i18n.t('button.close')}
                                />
                            </ModalFooter>
                        </Modal>
                    </Form>
                );
            }}
        </Formik>
    );
}

function CharacterSeries(props) {
    const { character } = props;
    return (
        <>
            <h3 className="fontWhite">{i18n.t('title.series')}</h3>
            <ListGroup>
                {character.series &&
                    character.series.map((serie, i) => {
                        return <ListGroupItem key={`serie_${i}`}>{serie.name}</ListGroupItem>;
                    })}
                {_.isEmpty(character.series) && (
                    <ListGroupItem>{i18n.t('msg.noSeriesFound')}</ListGroupItem>
                )}
            </ListGroup>
        </>
    );
}

CharacterPage.propTypes = {
    match: PropTypes.object.isRequired
};

CharacterInfo.propTypes = {
    character: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired
};

CharacterForm.propTypes = {
    character: PropTypes.object.isRequired,
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
};

CharacterSeries.propTypes = {
    character: PropTypes.object.isRequired
};

export default CharacterPage;
