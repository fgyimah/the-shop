import { render } from '@testing-library/react';
import AuthenticationModal from '../AuthenticationModal';

describe('Component Test - AuthenticationModal', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<AuthenticationModal open={true} onClose={() => {}} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
