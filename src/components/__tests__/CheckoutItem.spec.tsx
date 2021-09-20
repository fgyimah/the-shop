import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import CheckoutItem from '../CheckoutItem';

describe('Component Test - CheckoutItem', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    const data = {
        product: {
            id: '1',
            name: 'fake-product',
            description: 'fake description',
            price: 99,
            imageUrl: '',
        },
        quantity: 5,
    };

    it('matches snapshot', () => {
        const { asFragment } = render(<CheckoutItem cartItem={data} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders the quantity inside the checkout item', () => {
        const { getByTestId } = render(<CheckoutItem cartItem={data} />);
        expect(getByTestId('product-quantity').innerHTML).toMatch('5');
    });
});
