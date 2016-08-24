import React, {Component} from 'react';
import {
  View, Text,  StyleSheet, TouchableHighlight,ListView,ScrollView,Animated,Easing,
  TouchableWithoutFeedback,
} from 'react-native';
var MJCallout = require('react-native-callout');

export default class Tour extends Component {
  constructor(props) {
      super(props);
      this.state = {
        x:0, y:0, measurements: {},
         bounceValue: new Animated.Value(0),
         showBeacon: true, showCallout: false
      }
    }
    static defaultProps = {
        steps: [],
        visible: false,
        offsetX:0,
        offsetY:0
    };
    redraw(){
      // console.log('redraw was called!', this.props.steps[0].state)
      if(this.props.steps[0].state.measurements){
        // this.setState({})
        this.setState({
          // showBeacon:true,
          x: this.props.steps[0].state.measurements.x,
          y: this.props.steps[0].state.measurements.y,
          measurements:this.props.steps[0].state.measurements,
          calloutOffsetX:this.props.steps[0].props.calloutOffsetX,
          calloutOffsetY: this.props.steps[0].props.calloutOffsetY,
          beaconOffsetX:this.props.steps[0].props.beaconOffsetX,
          beaconOffsetY: this.props.steps[0].props.beaconOffsetY
        })
      }
    }
    componentDidMount() {
      // var
      // _cycleAnimation()


    }
    _cycleAnimation = () =>{
      Animated.sequence([
        Animated.timing(this.state.bounceValue, {
          toValue: 1,
          duration: 500,
          // easing:Easing.ease,
          delay: 0
        }),
        Animated.timing(this.state.bounceValue, {
          toValue: 0.5,
          duration: 500,
            // easing:Easing.ease,
          delay: 0
        }),
      ]).start((event) => {
        if(event.finished)
        this._cycleAnimation();
      });
    }

    _renderBeacon= () =>{
      if(this.state.showBeacon){
        this._cycleAnimation();
        return(
          <TouchableWithoutFeedback
            style={{
              // flex:1,
              // width:80,height:80,backgroundColor:'transparent',
              position:'absolute', left:this.state.x + this.state.beaconOffsetX, top:this.state.y+ this.props.beaconOffsetY,
            }}
            onPress={()=>{
              console.log('beacon clicked')
              this.setState({showBeacon:false, showCallout: true})
            }}>
            <Animated.View
              ref={'animation'}
            style={[{
              // flex:1,
              alignItems:'center',justifyContent:'center',
              width:40,height:40,backgroundColor:'transparent',
              padding:7,
              borderColor: '#000',
              borderRadius:50,
              borderWidth: 2,
              position:'absolute', left:this.state.x + this.state.beaconOffsetX, top:this.state.y+ this.state.beaconOffsetY,


              transform: [                        // `transform` is an ordered array
                {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
              ]
            },
          ] }
            onLayout={(event)=>{
              var {x, y, width, height} = event.nativeEvent.layout;
              // console.log(x, y, width, height)
            }} {...this.props}>

            <View style={[{
                alignSelf: 'stretch',flex:1,
              backgroundColor:'#000',
              borderColor: '#000',
              borderRadius:50,
              borderWidth: 2,
            },
          ] } />
          </Animated.View>
          </TouchableWithoutFeedback>
        )
      }
      return null;
    }

  render(){
    return (
      <View
        style={{
          // flex:1,
          // width:80,height:80,backgroundColor:'transparent',
          position:'absolute', top:0,bottom:0,left:0,right:0,
        }}>
      {this._renderBeacon()}
      {this.state.showCallout && <View
        onLayout={(event)=>{
          var {x, y, width, height} = event.nativeEvent.layout;
          // this.setState()
        }}
        style={{
          position:'absolute',
          top:this.state.y + this.state.calloutOffsetY,
          left:this.state.x+ this.state.calloutOffsetX
        }}>
         <MJCallout
            width={200} visibility={1}
           calloutView={<Text style={{height:40, margin: 20}}>This is my view</Text>}

           arrowDirection={'down'}>
         </MJCallout>
       </View>}
    </View>
    )
  }
}
