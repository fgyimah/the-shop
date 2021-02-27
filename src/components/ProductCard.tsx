import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../@types';
import { RootState } from '../store/root';
import { addItemToCart } from '../store/cart.reducer';

interface Props {
	product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	const history = useHistory();
	const cart = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();

	const addedToCart = () => {
		return cart.items.findIndex((item) => item.productId === product.id) !== -1;
	};

	const addToCart = () => {
		if (addedToCart()) return;
		dispatch(addItemToCart(product.id));
	};

	return (
		<StyledCard>
			<div className="image" onClick={() => history.push(`/products/${product.id}`)}>
				<img src={product.imageUrl} alt={product.name} />
			</div>
			<div className="info" onClick={() => history.push(`/products/${product.id}`)}>
				<h4>{product.name}</h4>
				<p className="item-description">{product.description}</p>
			</div>
			<div
				className={`add-to-cart-btn ${addedToCart() ? 'added-to-cart' : ''}`}
				onClick={addToCart}
			>
				{addedToCart() ? 'ADDED TO CART' : 'ADD TO CART'}
			</div>
			<div className="price-div" onClick={() => history.push(`/products/${product.id}`)}>
				GH₵ {product.price}
			</div>
		</StyledCard>
	);
};

const StyledCard = styled.div`
	box-shadow: 0 16px 16px -2px rgba(0, 0, 0, 0.4);
	margin: 1.5rem;
	height: max-content;
	position: relative;
	cursor: pointer;

	.image {
		img {
			width: 100%;
			height: 22rem;
		}
	}
	.info {
		text-align: center;
	}
	.add-to-cart-btn {
		background-color: #000;
		margin-top: 6px;
		color: #fff;
		padding: 1rem 2rem;
		cursor: pointer;
		width: 100%;
		text-align: center;
	}
	.added-to-cart {
		background-color: #2c2929;
		cursor: not-allowed;
	}

	.item-description {
		color: #3d3b3b;
	}

	.price-div {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: #000;
		background-size: cover;
		padding: 2rem;
		clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
		animation: clips 3s ease infinite;
		color: #fff;
	}

	@keyframes clips {
		50% {
			clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
		}
	}
`;

export default ProductCard;
