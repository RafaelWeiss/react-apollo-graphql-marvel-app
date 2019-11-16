import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Label, Input, FormFeedback } from 'reactstrap';

class InputContainer extends PureComponent {
    render() {
        const { label, name, value, onChange, errors, showlabel, ...rest } = this.props;
        return (
            <>
                {showlabel === true && <Label for={name}>{label}</Label>}
                <Input name={name} value={value} onChange={onChange} invalid={!!errors} {...rest} />
                <FormFeedback>required</FormFeedback>
            </>
        );
    }
}

InputContainer.defaultProps = {
    showlabel: true,
    label: null,
    value: null,
    errors: null
};

InputContainer.propTypes = {
    errors: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    showlabel: PropTypes.bool
};

export default InputContainer;
