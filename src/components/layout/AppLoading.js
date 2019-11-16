import React from 'react';
import { Spinner } from 'reactstrap';

const AppLoading = () => {
    return (
        <Spinner
            style={{ width: '3rem', height: '3rem', position: 'fixed', top: '30%', left: '50%' }}
        />
    );
};

export default AppLoading;
