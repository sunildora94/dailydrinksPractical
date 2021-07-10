import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router,Switch,Route,Redirect} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './Store/Reducer';
import HomePage from './homePage';
import { createBrowserHistory } from 'history';

const store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router history={createBrowserHistory()}>
      {/* <HashRouter> */}
          <Switch>
              <Route exact path="/" component={App} />
              <Route path="/home" component={HomePage} />
              <Redirect from="*" to="/" />
          </Switch>
      </Router>
      {/* </HashRouter> */}
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
