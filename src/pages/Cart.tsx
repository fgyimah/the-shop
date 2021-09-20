import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import { RootState } from '../store/root';
import firebase from '../firebase';
import { resetCart } from '../store/cart.reducer';

const Cart: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const [email, setEmail] = React.useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const initializePayment = usePaystackPayment({
        amount:
            100 *
            Number(
                cart.items
                    .reduce((prev, curr) => prev + curr.quantity * curr.product.price, 0)
                    .toFixed(2)
            ),
        email,
        publicKey: 'pk_test_0c07246f86b994d9c2c6f09f4759a3d4c45cae37',
        currency: 'GHS',
    });

    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                setEmail(user?.email!);
            }
        });

        return () => {
            unsubscribe();
        };
    });

    const onSuccessPayment = () => {
        dispatch(resetCart());
        toast.success('Order placed successfully');
        history.push('/products');
    };

    const checkout = () => {
        if (cart.items.reduce((prev, curr) => prev + curr.quantity * curr.product.price, 0) === 0) {
            toast.error('Cart is empty, please add some items');
            return;
        }
        if (firebase.auth().currentUser === null) {
            toast.error('Please log in to check out');
            return;
        } else {
            initializePayment(onSuccessPayment);
        }
    };

    return (
        <StyledDiv>
            <div className="checkout-page">
                <div className="checkout-header">
                    <div className="header-block">
                        <span>Product</span>
                    </div>
                    <div className="header-block">
                        <span>Description</span>
                    </div>
                    <div className="header-block">
                        <span>Quantity</span>
                    </div>
                    <div className="header-block">
                        <span>Price</span>
                    </div>
                    <div className="header-block">
                        <span>Remove</span>
                    </div>
                </div>
                {cart.items.map((cartItem) => (
                    <CheckoutItem key={cartItem.product.id} cartItem={cartItem} />
                ))}
                <div className="total">
                    TOTAL:
                    {cart.items
                        .reduce((prev, curr) => prev + curr.quantity * curr.product.price, 0)
                        .toFixed(2)}
                </div>
                <Button variant="contained" onClick={checkout}>
                    PROCEED TO CHECKOUT
                </Button>
            </div>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    .checkout-page {
        width: 55%;
        min-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 50px auto 0;

        .checkout-header {
            width: 100%;
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid darkgrey;

            .header-block {
                text-transform: capitalize;
                width: 23%;

                &:last-child {
                    width: 8%;
                }
            }
        }

        .total {
            margin-top: 30px;
            margin-left: auto;
            font-size: 36px;
        }

        button {
            margin-left: auto;
            margin-right: auto;
            margin-top: 50px;
            background-color: #000;
            color: #fff;
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 720px) {
        .checkout-header {
            flex-direction: column;
            text-align: center;
            align-items: center;
            .header-block {
                &:last-child {
                    width: 23% !important;
                }
            }
        }
    }
`;

export default Cart;
