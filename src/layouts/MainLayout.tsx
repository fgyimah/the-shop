import React, { Suspense } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const MainLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
	return (
		<div>
			<Suspense
				fallback={
					<StyledDiv>
						<BeatLoader />
					</StyledDiv>
				}
			>
				{renderRoutes(route?.routes)}
			</Suspense>
		</div>
	);
};

const StyledDiv = styled.div`
	width: 100vw;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default MainLayout;
