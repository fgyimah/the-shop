import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Product } from '../@types';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../store/cart.reducer';

interface Props {
    cartItem: { product: Product; quantity: number };
}

const CheckoutItem: React.FC<Props> = ({ cartItem }) => {
    const { product, quantity } = cartItem;
    const dispatch = useDispatch();

    const increaseCount = () => {
        dispatch(addItemToCart(product));
    };

    const decreaseCount = () => {
        dispatch(removeItemFromCart(product));
    };

    const removeItem = () => {
        dispatch(clearItemFromCart(product));
    };

    return (
        <StyledDiv>
            <div className="checkout-item">
                <div className="image-container">
                    <img src={product.imageUrl} alt="item" />
                </div>
                <span className="name">{product.name}</span>
                <span className="quantity">
                    <div className="arrow" onClick={decreaseCount}>
                        &#10094;
                    </div>
                    <span className="value">{quantity}</span>
                    <div className="arrow" onClick={increaseCount}>
                        &#10095;
                    </div>
                </span>
                <span className="price">{product.price}</span>
                <div className="remove-button" onClick={removeItem}>
                    &#10005;
                </div>
            </div>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    .checkout-item {
        width: 100%;
        display: flex;
        min-height: 100px;
        border-bottom: 1px solid darkgrey;
        padding: 15px 0;
        font-size: 20px;
        align-items: center;

        .image-container {
            width: 23%;
            padding-right: 15px;

            img {
                width: 100%;
                height: 100%;
            }
        }
        .name,
        .quantity,
        .price {
            width: 23%;
        }

        .quantity {
            display: flex;

            .arrow {
                cursor: pointer;
            }

            .value {
                margin: 0 10px;
            }
        }

        .remove-button {
            padding-left: 12px;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 720px) {
        .checkout-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
    }
`;

export default CheckoutItem;
