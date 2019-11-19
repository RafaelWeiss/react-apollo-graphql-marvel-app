import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand } from 'reactstrap';
import i18n from '../../i18n';
import LoadingContainer from './LoadingContainer';

const AppContainer = (props) => {
    const { loading, children, customComponent } = props;

    return (
        <div className="app-container">
            <Navbar color="light" light expand="md" fixed="top" className="app-nav-bar">
                <div className="app-nav-bar-limit">
                    <NavbarBrand href="/" style={{ marginTop: '5px' }}>
                        {i18n.t('title.appName')}
                    </NavbarBrand>
                    <div style={{ width: '100%' }}>{customComponent}</div>
                </div>
            </Navbar>
            <div className="app">{loading ? <LoadingContainer /> : children}</div>
        </div>
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
