import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Footer extends Component {
  render() {
    return (
      <View style={{flex: 0.1, backgroundColor: "#1B4496", justifyContent:"center", alignItems: 'center'}}>
          <Text style={{color: "white"}}>Hadi Abu-Maruf</Text>
      </View>
    );
  }
}  