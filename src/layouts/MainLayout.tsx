import React, { Suspense } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
    return (
        <div>
            <Navbar />
            <Suspense
                fallback={
                    <StyledDiv>
                        <BeatLoader />
                    </StyledDiv>
                }>
                {renderRoutes(route?.routes)}
            </Suspense>
            <Footer />
        </div>
    );
};

const StyledDiv = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default MainLayout;
