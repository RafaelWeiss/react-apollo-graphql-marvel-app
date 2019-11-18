import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Label, Input, FormFeedback } from 'reactstrap';

class InputContainer extends PureComponent {
    render() {
        const { label, name, value, onChange, errors, showlabel, required, ...rest } = this.props;
        return (
            <>
                {showlabel === true && (
                    <Label for={name}>
                        {label}
                        {required ? '*' : ''}
                    </Label>
                )}
                <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    invalid={!!errors}
                    required={required}
                    {...rest}
                />
                {errors && <FormFeedback>{errors}</FormFeedback>}
            </>
        );
    }
}

InputContainer.defaultProps = {
    showlabel: true,
    required: false,
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
    showlabel: PropTypes.bool,
    required: PropTypes.bool
};

export default InputContainer;
