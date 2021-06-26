import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
	return (
		<StyledDiv>
			<p>Nothing but the best in products and customer service</p>
			<p>
				© {new Date().getFullYear()} <strong className="logo">THEShop, </strong> all rights reserved
			</p>
		</StyledDiv>
	);
};

const StyledDiv = styled.div`
	background-color: #eee;
	align-items: center;
	justify-content: space-between;
	display: flex;
	height: 100px;
	padding: 1rem;

	.logo {
		font-weight: 700;
		color: #000;
	}
`;

export default Footer;
