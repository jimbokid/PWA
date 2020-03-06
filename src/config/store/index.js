import appReducers from '../reducer/rootReducer';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
    process.env.NODE_ENV === 'production'
        ? createStore(appReducers, composeEnhancers(applyMiddleware(thunk)))
        : createStore(
        appReducers,
        composeEnhancers(applyMiddleware(thunk, createLogger())),
        );

export default store;
