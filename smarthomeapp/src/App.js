import React, { Component } from 'react';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import store from './Redux/Store';
export default class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Home/>
      </Provider>
    );
  }
}
