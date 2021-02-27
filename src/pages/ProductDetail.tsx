import React from 'react';
import { Button } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { WhatsappShareButton } from 'react-share';
import { Product } from '../@types';
import firebase from '../firebase';
import { RootState } from '../store/root';
import { addItemToCart } from '../store/cart.reducer';

const ProductDetail: React.FC = () => {
	const [loading, setLoading] = React.useState(true);
	const [product, setProduct] = React.useState<Product>();
	const params = useParams<{ id: string }>();
	const history = useHistory();
	const cart = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const db = firebase.firestore();
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const doc = await db.doc(`products/${params.id}`).get();

				if (doc.exists) {
					setProduct(doc.data() as Product);
					setLoading(false);
				} else {
					toast.error('No such product with given id');
					history.replace('/products');
				}
			} catch (error) {
				toast.error(error.message);
				history.replace('/products');
			}
		};
		fetchProduct();
	}, [params.id, history]);

	const addedToCart = () => {
		return cart.items.findIndex((item) => item.product.id === product?.id) !== -1;
	};

	const addToCart = () => {
		if (addedToCart()) return;
		dispatch(addItemToCart(product!));
	};

	if (loading) {
		return (
			<LoadingDiv>
				<BeatLoader color="#000" />
			</LoadingDiv>
		);
	}

	return (
		<StyledDiv>
			<Helmet title={`${product?.name} | tendo-shop`} />
			<div>
				<img src={product?.imageUrl} alt={product?.name} className="product-image" />
			</div>
			<div>
				<h1 className="product-name">{product?.name}</h1>
				<h2 className="product-price">GH₵ {product?.price}</h2>
				<p className="product-description">{product?.description}</p>
				<div className="buttons">
					<Button
						variant="contained"
						className="btn btn-cart"
						disabled={addedToCart()}
						onClick={addToCart}
					>
						{addedToCart() ? (
							<>
								ADDED TO CART <i className="fas fa-heart"></i>
							</>
						) : (
							<>
								ADD TO CART <i className="far fa-heart"></i>
							</>
						)}
					</Button>
					<WhatsappShareButton url={window.location.href}>
						<span className="btn btn-whatsapp" title={`${product?.name} - GH₵ ${product?.price}`}>
							SHARE ON WHATSAPP <i className="fab fa-whatsapp"></i>
						</span>
					</WhatsappShareButton>
				</div>
			</div>
			<Button variant="contained" className="back-btn" onClick={() => history.push('/products')}>
				<i className="fas fa-long-arrow-alt-left"></i>
			</Button>
		</StyledDiv>
	);
};

const StyledDiv = styled.div`
	min-height: 80vh;
	margin-top: 1rem;
	display: flex;
	& > div:nth-child(-n + 2) {
		width: 80%;
	}
	.product-image {
		width: 100%;
	}
	.product-name {
		font-size: 6rem;
		text-transform: capitalize;
	}
	.product-price {
		font-size: 3.5rem;
	}
	.product-description {
		color: #3d3b3b;
		margin-top: 4rem;
	}
	.buttons {
		margin-top: 7rem;
		margin-bottom: 3rem;
		.btn {
			color: #fff;
			font-size: 1.8rem;
			border-radius: 0;
		}
		.btn-cart {
			background-color: #000;
		}
	}
	.btn-whatsapp {
		background-color: green !important;
		color: #fff !important;
		padding: 1.1rem 2rem !important;
		padding-bottom: 1.7rem !important;
	}
	.back-btn {
		height: max-content;
		background: #000;
		color: #fff;
		width: 12rem;
		margin-bottom: 1rem;
		font-size: 1.7rem;

		&:hover {
			background: #000;
			color: #fff;
		}
	}
	.fa-heart,
	.fa-whatsapp {
		margin: 1rem;
	}

	@media screen and (max-width: 720px) {
		flex-direction: column;
		align-items: center;
		text-align: center;

		& > div:nth-child(-n + 2) {
			width: 100%;
		}

		.buttons {
			width: 100%;
			.btn-cart {
				background-color: #000;
				margin-top: -1rem;
				width: 90%;
			}
		}
		.btn-whatsapp {
			display: block;
			margin-top: 1rem !important;
			padding: 0 !important;
			width: 90vw !important;
		}
		.back-btn {
			width: 90%;
			margin-left: 1rem;
			margin-right: 1rem;
		}
	}
`;

const LoadingDiv = styled.div`
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default ProductDetail;
