import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Yup from 'yup';
import {
    Media,
    Jumbotron,
    Row,
    Col,
    Form,
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import AppContainer from '../components/layout/AppContainer';
import InputContainer from '../components/form/InputContainer';
import ButtonContainer from '../components/form/ButtonContainer';
import useGetCharacterById from '../grapql/useGetCharacterById';
import useSaveCharacter from '../grapql/useSaveCharacter';

function CharacterPage(props) {
    const { match } = props;
    const [modal, setModal] = useState(false);
    const { loading, data } = useGetCharacterById({ id: match.params.id });
    const [saveCharacter] = useSaveCharacter();
    const toggle = () => setModal(!modal);

    let character = null;
    if (!loading) {
        character = data ? data.characters[0] : {};
    }

    return (
        <AppContainer loading={loading}>
            {data && (
                <>
                    <Jumbotron
                        style={{
                            padding: '2rem 2rem'
                        }}>
                        <Row>
                            <Col lg={4} md={12} sm={12} xs={12}>
                                <Media
                                    object
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
                                    Edit
                                </Button>
                                <h1 className="display-3">{character.name}</h1>
                                <hr className="my-2" />
                                <p>{character.description}</p>
                                <p className="lead">&nbsp;</p>
                                <h3 className="display-8">:: Series</h3>
                                <ListGroup>
                                    {character.series.map((serie, i) => {
                                        return (
                                            <ListGroupItem key={`serie_${i}`}>
                                                {serie.name}
                                            </ListGroupItem>
                                        );
                                    })}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Jumbotron>

                    <Formik
                        initialValues={{
                            key: character.id,
                            name: character.name,
                            description: character.description
                        }}
                        onSubmit={(values) => {
                            saveCharacter({
                                variables: values
                            });
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required()
                        })}>
                        {({ values, errors, handleChange, handleSubmit }) => {
                            return (
                                <Form>
                                    <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader toggle={toggle}>Edit Character</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <InputContainer
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
                                                    required
                                                    errors={errors.description}
                                                    name="description"
                                                    placeholder="description"
                                                />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <ButtonContainer
                                                color="primary"
                                                onClick={handleSubmit}
                                                label="Save"
                                            />
                                            <ButtonContainer
                                                color="secondary"
                                                onClick={toggle}
                                                label="Close"
                                            />
                                        </ModalFooter>
                                    </Modal>
                                </Form>
                            );
                        }}
                    </Formik>
                </>
            )}
        </AppContainer>
    );
}

CharacterPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default CharacterPage;
