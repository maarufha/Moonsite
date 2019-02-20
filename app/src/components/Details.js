import React, { Component } from 'react';
import  { Card, Text} from 'native-base';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';

import Stars from '../components/Stars';

export default class Details extends Component {
  render() {
    const width = Dimensions.get('window').width;
    return (
    <TouchableOpacity onPress={this.props.clicked}>
      <Card style={{ marginBottom:10, marginTop:10, marginLeft:10, marginRight:10}}>
          <Image source={this.props.image} style={{height: 200, resizeMode: "stretch"}}/>
          <View style={{ alignSelf:"center",borderBottomColor: '#A1B8E6', borderBottomWidth: 3, width:width}}/>
            <Text style={{textAlign:"center", fontSize:18, fontWeight: 'bold'}}>{this.props.name}</Text>
            <View style={{ alignSelf:"center",borderBottomColor: '#A1B8E6', borderBottomWidth: 3, width:width}}/>
           <Stars style={{ alignSelf:"center"}} rating={this.props.average}/>
      </Card>
      </TouchableOpacity>
    )
  }
}  