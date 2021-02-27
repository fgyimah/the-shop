import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store, { persistor } from './store';

ReactDOM.render(
	<ReduxProvider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</ReduxProvider>,
	document.getElementById('root')
);
