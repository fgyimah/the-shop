import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('Component Test - Footer', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Footer />);
        expect(asFragment()).toMatchSnapshot();
    });
});
