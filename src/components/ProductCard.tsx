import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Product } from '../@types';

interface Props {
	product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	const history = useHistory();

	return (
		<StyledCard onClick={() => history.push(`/products/${product.id}`)}>
			<div className="image">
				<img src={product.imageUrl} alt={product.name} />
			</div>
			<div className="info">
				<h4>{product.name}</h4>
				<p>{product.description}</p>
			</div>
			<div className="add-to-cart-btn">ADD TO CART</div>
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
		color: #fff;
		padding: 1rem 2rem;
		cursor: pointer;
		width: 100%;
		text-align: center;
	}
`;

export default ProductCard;
