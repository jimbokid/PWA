import React, { Component } from 'react';
import 'raf/polyfill';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import MovieDetailContainer from './components/MovieDetail/MovieDetailContainer';
import SearchResultsContainer from './components/SearchResults/SearchResultsContainer';
import PersonDetailContainer from './components/PersonDetail/PersonDetailContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={DashboardContainer} />
            <Route
              path="/moviedetail/:type/:id"
              component={MovieDetailContainer}
            />
            <Route
              path="/searchResults/:searchType/:id/:genreName"
              component={SearchResultsContainer}
            />
            <Route path="/persondetail/:id" component={PersonDetailContainer} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
