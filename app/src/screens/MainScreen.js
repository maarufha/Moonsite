import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Header, Item, Input } from 'native-base';

import Details from '../components/Details';
import Footer from '../components/Footer';

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(){
    super()
    this.state = {
      data:[],//all data from url
      results : [],//for filtering results
      tempData:[],//to save the preveious data in case we are already filtered 
      isLoading:true,//onLoad from url
      listLength: 10,//each time display more 10 items in rooling
      loadingMore: true,//flag to know if there is more data to display
      filter: false,//flag for filtering (searching) mode
    }
  }

  componentDidMount() {
    fetch("http://api.tvmaze.com/schedule")
        .then(response => response.json())
        .then(responseJson => {
           this.setState({
            data:responseJson,
            results : responseJson,
            isLoading:false
          });
        })
        .catch(error => {
            this.setState({ error, isLoading: false });
        });
  } 

  
  loadMoreData(){
    const {data,listLength} = this.state
    const dataLength = data.length
    //get more 10 results
      this.setState({
                     data:[...data,...this.state.results.slice(dataLength,dataLength+listLength)],
                     loadingMore:true
                    })
  }


  filterResults(text){ 

    //check if already user start typing on search  
    if ( text.length > 0){ 
      if ( !this.state.filter ){
        this.setState({tempData: this.state.data,filter: true})
      }
      var filteredData = this.state.results.filter((item)=>{
        return item.show.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
      })

      this.setState({
        data: filteredData,
        loadingMore:false
      })
    } 
    //search is empty
    else { 
      this.setState({
        data: this.state.tempData,
        filter: false,
        loadingMore:true
      })
    }
  }


  renderItem = ({item}) =>{
    var {name, image, rating, summary, genres, language, schedule, network} = item.show
    image = (image == null) ? require("../images/NoImage.png") : {uri: image.medium}
    summary = (summary == null? "": summary)
    return(
     <Details name={name} image={image} average={rating.average} 
               clicked={()=>this.props.navigation.navigate("ShowScreen",
                  {
                      name: name, 
                      img: image, 
                      rating: rating.average,
                      summary: summary,
                      genres: genres,
                      language: language, 
                      schedule: schedule,
                      network: network
                    })
                  }
              />
    )
  }


  render(){
    return(
      this.state.isLoading? 
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
      : 
      <View style={{flex:1}}>
        <View style={{flex:1, backgroundColor: '#A1B8E6'}}>
          <Header searchBar rounded style={{backgroundColor: '#1B4496'}}>
            <Item>
              <Input placeholder="Search" onChangeText={text=>this.filterResults(text)}/>
            </Item>
          </Header>
          <FlatList 
              data={this.state.data}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item)=>item.id}
              onEndReached={ this.state.loadingMore ? this.loadMoreData.bind(this) : ()=>{}}
            />
        </View>
        <Footer/>
      </View>
    )
  }
}
  