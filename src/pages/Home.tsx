import React from 'react';
import { Helmet } from 'react-helmet-async';
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
                setProducts(data.docs.map((doc) => doc.data()) as Product[]);

                setLoading(false);
            } catch (error: any) {
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
        <div>
            <Helmet title="Home | the-shop" />
            <StyledDiv>
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </StyledDiv>
        </div>
    );
};

const StyledDiv = styled.div`
    min-height: 80vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media screen and (max-width: 1120px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 540px) {
        grid-template-columns: 1fr;
    }
`;

const LoadingDiv = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default HomePage;
