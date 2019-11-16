import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Yup from 'yup';
import { Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import InputContainer from '../../components/form/InputContainer';
import ButtonContainer from '../../components/form/ButtonContainer';
import useSaveCharacter from '../../grapql/useSaveCharacter';

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
                    toast.success('Success message', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    toggle();
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
                                        label="Name"
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
                                        label="Description"
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
                                <ButtonContainer color="secondary" onClick={toggle} label="Close" />
                            </ModalFooter>
                        </Modal>
                    </Form>
                );
            }}
        </Formik>
    );
}

CharacterForm.propTypes = {
    character: PropTypes.object.isRequired,
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
};

export default CharacterForm;
