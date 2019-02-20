import React, { Component } from 'react';
import  { Card, Text, CardItem, Left, Right } from 'native-base';

import StarRating from 'react-native-star-rating';

export default class Stars extends Component {
  render() {
    return (
        <CardItem>
           <Left>
                <Text style={{textAlign:"center", fontSize:16}}>Rating: {this.props.rating == null ? 0 : this.props.rating}</Text>
           </Left>
           <Right>
                <StarRating
                    disabled={false}
                    maxStars={8}
                    spacing={1}
                    starSize={30}
                    emptyStar={require('../images/gray_star.png')}
                    fullStar={require('../images/yellow_star.png')}
                    halfStar={require('../images/half_star.png')}
                    rating={this.props.rating}
                    />
            </Right>
        </CardItem>
    )
  }
}  