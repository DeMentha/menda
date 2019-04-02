import React, { Component } from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app_reducer';
import HeaderContainer from './components/header/HeaderContainer';


const store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <HeaderContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
