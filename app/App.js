import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import MainScreen from './src/screens/MainScreen';
import ShowScreen from './src/screens/ShowScreen';

console.disableYellowBox = true

export default class App extends Component {
  render(){
    return(
      <Navigator/>
    )
  }
}
const Navigator = createStackNavigator({
  MainScreen: MainScreen,
  ShowScreen: ShowScreen
})