import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import GlobalStyle from './theme/global';

const App: React.FC = () => {
	return (
		<Router>
			<GlobalStyle />

			{/* render application routes */}
			{renderRoutes(routes)}
		</Router>
	);
};

export default App;
