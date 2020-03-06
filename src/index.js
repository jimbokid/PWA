import React from 'react';
import ReactDOM from 'react-dom';
import App from './config/router/App';
import registerServiceWorker from './config/cache/registerServiceWorker';
import './index.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
