import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand } from 'reactstrap';

import AppLoading from './AppLoading';

const AppContainer = (props) => {
    const { loading, children, customComponent } = props;

    return (
        <>
            <Navbar color="light" light expand="md" fixed="top" className="NavBar">
                <NavbarBrand href="/">Marvel App</NavbarBrand>
                <div style={{ width: '100%' }}>{customComponent}</div>
            </Navbar>
            <div className="App">{loading ? <AppLoading /> : children}</div>
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
