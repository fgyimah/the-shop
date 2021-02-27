import React from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Product } from '../@types';
import ProductCard from '../components/ProductCard';
import firebase from '../firebase';

const HomePage: React.FC = () => {
	const [loading, setLoading] = React.useState(true);
	const [products, setProducts] = React.useState<Product[]>([]);

	React.useEffect(() => {
		const db = firebase.firestore();
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const data = await db.collection('products').get();
				setProducts(data.docs.map((doc) => doc.data()) as any);

				setLoading(false);
			} catch (error) {
				toast.error(error.message);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<LoadingDiv>
				<BeatLoader color="#000" />
			</LoadingDiv>
		);
	}

	return (
		<StyledDiv>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</StyledDiv>
	);
};

const StyledDiv = styled.div`
	min-height: 80vh;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 0.3fr));

	@media screen and (max-width: 720px) {
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	}
`;

const LoadingDiv = styled.div`
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default HomePage;
