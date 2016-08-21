import React, {Component} from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableHighlight,ListView,ScrollView,
  Image, Dimensions, TouchableWithoutFeedback, TimePickerAndroid, DeviceEventEmitter
} from 'react-native';


export default class TourView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        measurements: null,height:0
      }
    }
  render(){
    return (
      <View
        style={[{
          // borderColor: '#000',
          // borderWidth: 2

        }]}
        onLayout={(event, x)=>{
          var  {x, y, width, height} = event.nativeEvent.layout;
          if(true){
            this.setState({measurements:{x, y, width, height}, height, width})
            this.props.tour.redraw()
            console.log(x, y, width, height)
          }

        }} {...this.props}>
        {this.props.children}
      
      </View>
    )
  }
}
