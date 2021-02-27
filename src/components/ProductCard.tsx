import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Product } from '../@types';

interface Props {
	product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	const history = useHistory();

	const addToCart = () => {
		console.log('add to cart!!! ', product.id);
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
			<div className="add-to-cart-btn" onClick={addToCart}>
				ADD TO CART
			</div>
		</StyledCard>
	);
};

const StyledCard = styled.div`
	box-shadow: 0 16px 16px -2px rgba(0, 0, 0, 0.4);
	margin: 1.5rem;
	height: max-content;
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

	.item-description {
		color: #3d3b3b;
	}
`;

export default ProductCard;
