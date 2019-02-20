import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { CardItem, Text, Left } from 'native-base';

import Stars from '../components/Stars';
import Footer from '../components/Footer';

export default class ItemInfoScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
    headerTintColor: 'white',
    headerTitleStyle: { color: "white"},
    headerStyle: {backgroundColor: "#1B4496"}
  })

  constructor(props){
    super(props)
    const {name,rating,img,summary,genres,language,schedule,network} = this.props.navigation.state.params
    this.state = {
      name: name,
      rating: rating,
      image: img,
      summary: summary,
      genres: genres,
      language:language,
      schedule:schedule,
      network:network
    }
  }

  render(){
    const deviceWidth = Dimensions.get('window').width

    const regex = /(<([^>]+)>)/ig;
    const summary = this.state.summary.replace(regex,'')
    const genres = this.state.genres.map((data,index) => {
      return (
        <Text>{data}</Text>
      )
    })

    var array = this.state.schedule.days;
    var days = ""
    if (  array.length ==  1) {
      days = array[0]
    } 
    else if(array.length<7){
      for (x in array)
        days += array[x] + ", "
      }
      else
        days = "Every Day"
    return(
      <View style={{flex:1}}>
        <ScrollView style={{flex:1,backgroundColor:"white"}}>
          <Image source={this.state.image} style={{height: 350, resizeMode: "stretch", flex: 1}}/>
              <Stars style={{ alignSelf:"center"}} rating={this.state.rating}/>
            <Text></Text>
          <Text style={{marginLeft:15}}>{summary}</Text>
          {genres.length>0 ?
           <CardItem  style={{marginLeft:-13}}>
           <Left>
             <Text>Genres:</Text>
             <View style={{flexDirection: 'row'}}>{genres}</View>
           </Left>
           </CardItem>
           :
           <View></View>
          }
       
          <View style={{marginLeft:15}}>
          <Text>Days: {days} at {this.state.schedule.time}</Text>
          <Text>Language: {this.state.language}</Text>
          <Text>Network: {this.state.network.name}</Text>
          </View>
       </ScrollView>
       <Footer/>
      </View>
    )
  }
}