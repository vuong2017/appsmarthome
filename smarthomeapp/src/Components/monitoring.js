import React, { Component } from 'react';
import { Text , StyleSheet , View , Image , Button , Dimensions , Switch , ScrollView , Animated ,Alert } from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';﻿
import {connect} from 'react-redux';
import {Getdatasensor,Getstatusdevice,Gettimeonoff,Getstatistical} from '../Redux/ActionCreators';
import Tempandhumidity from './Tempandhumidity';
import Controlandmonitoring from './Controlandmonitoring';
import Timestatisticsonoff from './Timestatisticsonoff';
import Statisticstoday from './Statisticstoday';
class Monitoring extends Component {
  constructor(props){
    super(props);
    e = this;
    this.socket = io("http://192.168.1.131:3000/",{jsonp:false});
    this.socket.emit("datasensor","testnew");
    this.socket.emit("statistical","testnew");
    this.socket.emit("statusdevice","xuly");
  }
  componentDidMount(){
    this.datasensor();
    this.statistical();
    this.statusdevice();
    this.timeonoff();
  }
  datasensor(){
    e = this;
    this.socket.on("datasensor",function(data){
        e.props.Getdatasensor(data);
    });
  }
  statusdevice(){
    e = this;
    this.socket.on("statusdevice",function(data){
        e.props.Getstatusdevice(data[0].status)
        console.log(e.props.statusdevice)
    });
  }
  statistical(){
    e = this;
    this.socket.on("statistical",function(data){
        e.props.Getstatistical(data);
        console.log("hello"+data)
    });

  }
  onoffdevice(status){
    this.socket.emit("onoffdevice",status);
  }
  timeonoff(){
    e = this;
    this.socket.on("timeonoff",function(data){
        e.props.Gettimeonoff(data);
    });
  }
  render() {
    return (
      <View style={styles.container} >
          <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}>
            <Image  style={{flex:1 ,width:Dimensions.get('window').width,height:Dimensions.get('window').height}} source={require('../../public/icon/mua3.jpg')} />
          </View>
          <ScrollView>
          {this.props.datasensor==null ? null : <Tempandhumidity /> }
          {this.props.datasensor==null||this.props.statusdevice==null ? null : <Controlandmonitoring add={this} />}
          {this.props.timeonoff==null ? null : <Timestatisticsonoff />}
          {this.props.statistical=='' ? null : <Statisticstoday /> }
          </ScrollView>
      </View>

    );
  }
}


const styles  = StyleSheet.create({
    container : {
      flex : 1,
      flexDirection:'column',
      paddingTop:20,
      paddingLeft:5,
      paddingRight:5
    }
})
const mapStateToProps = state =>({
  datasensor:state.datasensor,
  statusdevice:state.statusdevice,
  timeonoff:state.timeonoff,
  statistical:state.statistical,
  statussetupautomatic:state.statussetupautomatic
})

export default connect(mapStateToProps,{Getdatasensor,Getstatusdevice,Gettimeonoff,Getstatistical})(Monitoring);
