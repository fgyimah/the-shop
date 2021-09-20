import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import ProductCard from '../ProductCard';

jest.mock('react-redux', () => ({
    ...(jest.requireActual('react-redux') as any),
    useSelector: jest.fn(),
}));

describe('Component Test - ProductCard', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    it('matches snapshot', () => {
        useSelectorMock.mockReturnValue({ items: [] });
        const data = {
            product: {
                id: '1',
                name: 'fake-product',
                description: 'fake description',
                price: 99,
                imageUrl: '',
            },
        };
        const { asFragment } = render(<ProductCard {...data} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders using data passed to it', () => {
        useSelectorMock.mockReturnValue({ items: [] });
        const data = {
            product: {
                id: '1',
                name: 'fake-product',
                description: 'fake description',
                price: 99,
                imageUrl: '',
            },
        };
        const { getByTestId } = render(<ProductCard {...data} />);
        expect(getByTestId('product-name').innerHTML).toMatch(data.product.name);
        expect(getByTestId('product-description').innerHTML).toMatch(data.product.description);
        expect(getByTestId('product-price').innerHTML).toMatch(`GH₵ ${data.product.price}`);
    });
});
