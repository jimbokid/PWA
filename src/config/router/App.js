import React, {Component} from 'react';
import 'raf/polyfill';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from '../store';
import Dashboard from '../../routes/Dashboard';
import MovieDetail from '../../routes/MovieDetail';
import SearchResults from '../../routes/SearchResults';
import PersonDetail from '../../routes/PersonDetail';
import Profile from '../../routes/Profile/Profile';

import Auth from '../../shared/Auth';

class App extends Component {
  render() {
    return (
      <Auth>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route
                path="/moviedetail/:type/:id"
                component={MovieDetail}
              />
              <Route
                path="/searchResults/:searchType/:id/:genreName"
                component={SearchResults}
              />
              <Route
                path="/persondetail/:id"
                component={PersonDetail}
              />
              <Route path="/profile/" component={Profile}/>
            </Switch>
          </Router>
        </Provider>
      </Auth>
    );
  }
}

export default App;
