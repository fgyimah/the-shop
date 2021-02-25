import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import AuthenticationModal from './AuthenticationModal';

const Navbar: React.FC = () => {
	const [authModalOpen, setAuthModalOpen] = React.useState(false);
	const loginUser = () => {
		setAuthModalOpen(true);
	};

	return (
		<>
			<StyledNav>
				<NavLink to="/" className="logo">
					<h1>tendoSHOP</h1>
				</NavLink>
				<div>
					<input type="text" className="searchField" placeholder="Search Products" />
					<span className="login" onClick={loginUser}>
						LOGIN <i className="fas fa-sign-in-alt"></i>
					</span>
					<i className="fas fa-shopping-cart">
						<div className="cart-number">23</div>
					</i>
				</div>
			</StyledNav>
			<AuthenticationModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
		</>
	);
};

const StyledNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);

	.logo {
		font-weight: bold;
		font-size: 2rem;
		text-decoration: none;
	}

	.searchField {
		border: none;
		&:focus {
			outline: none;
		}

		width: 400px;
		display: inline-block;
		border-bottom: 1px solid #c2c2c2;
		padding: 2px;
	}

	.login {
		display: inline-block;
		padding: 0.3rem 1.5rem;
		background: #000;
		color: #fff;
		margin-left: 3rem;
		margin-right: 1rem;
		cursor: pointer;
		border-radius: 6px;
	}

	.fa-sign-in-alt {
		font-size: 12px;
		margin: 0.5rem;
	}

	.fa-shopping-cart {
		position: relative;
		margin-left: 2rem;
		margin-right: 2rem;
		font-size: 20px;
	}

	.cart-number {
		position: absolute;
		width: 20px;
		background: #000;
		color: #fff;
		font-size: 1.6rem;
		top: -8px;
		right: -10px;
		border-radius: 100px;
	}

	@media screen and (max-width: 720px) {
		flex-direction: column;
		align-items: center;

		.searchField {
			width: 90vw;
			margin-left: 1rem;
			margin-right: 1rem;
		}

		.login {
			margin-top: 1rem;
			width: 90vw;
		}

		.fa-shopping-cart {
			margin-top: 1rem;
		}
	}
`;

export default Navbar;
