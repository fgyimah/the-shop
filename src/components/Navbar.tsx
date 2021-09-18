import React from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthenticationModal from './AuthenticationModal';
import firebase from '../firebase';
import { logoutUser } from '../helpers/auth.helpers';
import { RootState } from '../store/root';

const Navbar: React.FC = () => {
    const [authModalOpen, setAuthModalOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const history = useHistory();
    const cart = useSelector((state: RootState) => state.cart);
    const loginUser = () => {
        setAuthModalOpen(true);
    };

    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) setLoggedIn(true);
            else setLoggedIn(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <StyledNav>
                <NavLink to="/" className="logo">
                    <h1>THEShop</h1>
                </NavLink>
                <div>
                    {/* <input type="text" className="searchField" placeholder="Search Products" /> */}
                    {loggedIn ? (
                        <span className="profile">{firebase.auth().currentUser?.email}</span>
                    ) : (
                        <span className="login" onClick={loginUser}>
                            LOGIN <i className="fas fa-sign-in-alt"></i>
                        </span>
                    )}
                    <div>
                        {loggedIn && (
                            <span onClick={logoutUser} className="login">
                                LOGOUT
                                <i className="fas fa-sign-in-alt" />
                            </span>
                        )}
                        <i className="fas fa-shopping-cart" onClick={() => history.push('/cart')}>
                            <div className="cart-number">
                                {cart.items.reduce((cum, curr) => curr.quantity + cum, 0)}
                            </div>
                        </i>
                    </div>
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

    & > div {
        display: flex;
        align-items: center;
    }

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
        padding: 0.3rem 1.3rem;
        background: #000;
        color: #fff;
        margin-left: 1rem;
        margin-right: 1rem;
        cursor: pointer;
        border-radius: 6px;
        text-align: center;
    }

    .fa-sign-in-alt {
        font-size: 16px;
        margin: 0.5rem;
    }

    .fa-shopping-cart {
        position: relative;
        margin-left: 0.4rem;
        margin-right: 0.8rem;
        font-size: 20px;
        cursor: pointer;
    }

    .cart-number {
        position: absolute;
        width: 20px;
        background: #fff;
        color: #000;
        font-size: 1.6rem;
        top: -8px;
        right: -10px;
        border-radius: 10px;
    }
    .profile {
        margin-left: 0.1rem;
        margin-right: 0.2rem;
        cursor: pointer;
    }

    @media screen and (max-width: 720px) {
        flex-direction: column;
        align-items: center;
        text-align: center;

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
        .profile {
            display: block;
        }
        & > div {
            flex-direction: column;
        }
    }
`;

export default Navbar;
