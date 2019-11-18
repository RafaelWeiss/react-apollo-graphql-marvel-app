import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand } from 'reactstrap';
import i18n from '../../i18n';
import LoadingContainer from './LoadingContainer';

const AppContainer = (props) => {
    const { loading, children, customComponent } = props;

    return (
        <>
            <Navbar color="light" light expand="md" fixed="top" className="navBar">
                <NavbarBrand href="/" style={{ marginTop: '5px' }}>
                    {i18n.t('title.appName')}
                </NavbarBrand>
                <div style={{ width: '100%' }}>{customComponent}</div>
            </Navbar>
            <div className="app">{loading ? <LoadingContainer /> : children}</div>
        </>
    );
};

AppContainer.defaultProps = {
    customComponent: null,
    children: null
};

AppContainer.propTypes = {
    children: PropTypes.object,
    customComponent: PropTypes.object,
    loading: PropTypes.bool.isRequired
};

export default AppContainer;
