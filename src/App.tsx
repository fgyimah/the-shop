import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import routes from './routes';
import GlobalStyle from './theme/global';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <Router>
            <GlobalStyle />

            <HelmetProvider>
                {/* render application routes */}
                {renderRoutes(routes)}
            </HelmetProvider>

            <ToastContainer />
        </Router>
    );
};

export default App;
