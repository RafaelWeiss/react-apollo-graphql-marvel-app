import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterList from '../pages/CharacterList';
import { GET_CHARACTERS } from '../graphql/useGetCharacters';

const mocks = [
    {
        request: {
            query: GET_CHARACTERS,
            variables: {}
        },
        result: {
            data: {
                characters: [
                    {
                        id: '1011334',
                        name: '3-D Man',
                        thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg'
                    },
                    {
                        id: '1017100',
                        name: 'A-Bomb (HAS)',
                        thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg'
                    },
                    {
                        id: '1009144',
                        name: 'A.I.M.',
                        thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec.jpg'
                    }
                ]
            }
        }
    }
];

test('should render all characters in list', async () => {
    const { findByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Router>
                <CharacterList />
            </Router>
        </MockedProvider>
    );

    const character1 = await findByText('3-D Man');
    const character2 = await findByText('A-Bomb (HAS)');
    const character3 = await findByText('A.I.M.');

    await wait(() => {
        expect(character1).toBeInTheDocument();
        expect(character2).toBeInTheDocument();
        expect(character3).toBeInTheDocument();
    });
});
