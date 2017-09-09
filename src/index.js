import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(logger,thunk))
	)

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>	
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
