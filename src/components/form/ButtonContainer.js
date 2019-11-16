import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class ButtonContainer extends PureComponent {
    render() {
        const { label, ...rest } = this.props;
        return <Button {...rest}>{label}</Button>;
    }
}

ButtonContainer.propTypes = {
    label: PropTypes.string.isRequired
};

export default ButtonContainer;
