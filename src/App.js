import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterPage from './pages/CharacterPage';

function App() {
    return (
        <Router>
            <Route exact path="/" component={CharacterList} />
            <Route path="/character/:id" component={CharacterPage} />
        </Router>
    );
}

export default App;
