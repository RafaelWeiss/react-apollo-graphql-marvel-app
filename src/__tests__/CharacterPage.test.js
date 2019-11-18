import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterPage from '../pages/CharacterPage';
import { GET_CHARACTER_BY_ID } from '../graphql/useGetCharacterById';

const mocks = [
    {
        request: {
            query: GET_CHARACTER_BY_ID,
            variables: { id: 1011334 }
        },
        result: {
            data: {
                characters: [
                    {
                        id: '1011334',
                        name: '3-D Man',
                        description: '',
                        thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg',
                        series: [
                            {
                                name: 'Avengers: The Initiative (2007 - 2010)'
                            },
                            {
                                name: 'Deadpool (1997 - 2002)'
                            },
                            {
                                name: 'Marvel Premiere (1972 - 1981)'
                            }
                        ]
                    }
                ]
            }
        }
    }
];

test('should render a specific character page', async () => {
    const { findByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Router>
                <CharacterPage match={{ params: { id: 1011334 } }} />
            </Router>
        </MockedProvider>
    );

    const character = await findByText('3-D Man');

    await wait(() => {
        expect(character).toBeInTheDocument();
    });
});
