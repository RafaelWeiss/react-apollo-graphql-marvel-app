import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import AppLoading from './AppLoading';

const AppContainer = (props) => {
    const { loading, children, customComponent } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="light" light expand="md" fixed="top" className="NavBar">
                <NavbarBrand href="/">Marvel App</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                {customComponent}
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <div className="App">{loading ? <AppLoading /> : children}</div>
        </>
    );
};

AppContainer.defaultProps = {
    customComponent: null
};

AppContainer.propTypes = {
    children: PropTypes.object.isRequired,
    customComponent: PropTypes.object,
    loading: PropTypes.bool.isRequired
};

export default AppContainer;
