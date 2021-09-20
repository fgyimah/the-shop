import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';

jest.mock('react-redux', () => ({
    ...(jest.requireActual('react-redux') as any),
    useSelector: jest.fn(),
}));

describe('Component Test - Navbar', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    it('matches snapshot', () => {
        useSelectorMock.mockReturnValue({ items: [] });
        const { asFragment } = render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders using data passed to it', () => {
        useSelectorMock.mockReturnValue({ items: [] });
        const { getByTestId } = render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(getByTestId('cart-number').innerHTML).toMatch('0');
    });

    it('Displays cart number matching number of items in state', () => {
        useSelectorMock.mockReturnValue({ items: [{ quantity: 4 }, { quantity: 7 }] });
        const { getByTestId } = render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(getByTestId('cart-number').innerHTML).toMatch('11');
    });
});
