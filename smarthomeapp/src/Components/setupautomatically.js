import React, { Component } from 'react';
import { View , StyleSheet , TextInput , Dimensions , Button , Text ,ActivityIndicator , Image , Alert , TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import io from 'socket.io-client/dist/socket.io.js';﻿
import moment from 'moment';
import {Getstatussetupautomatic,Setupautomaticon,Setupautomaticoff,ShowDateTime,ShowDateTime1} from '../Redux/ActionCreators';
import DateTimePicker from 'react-native-modal-datetime-picker';
class Setupautomatically extends Component{
  constructor(props){
    super(props);
    this.state={timeoff:null,timeon:null,isDateTimePickerVisible:false,isDateTimePickerVisible1:false}
    this.socket = io("http://192.168.1.131:3000/",{jsonp:false});
    this.socket.emit("statussetupautomatic","timeautomatic");
  }
  componentDidMount(){
    this.timesetupautomatic();
  }
  timesetupautomatic(){
    b = this;
    this.socket.on("statussetupautomatic",function(data){
        var messages = 'Chưa được thiết lập';
        if(data[0].timeoff==null&&data[1].timeon) return b.props.Getstatussetupautomatic(messages,moment.utc(data[1].timeon).format(' HH:mm'));
        if(data[0].timeoff&&data[1].timeon==null) return b.props.Getstatussetupautomatic(moment.utc(data[0].timeoff).format(' HH:mm'),messages);
        if(data[0].timeoff&&data[1].timeon) return b.props.Getstatussetupautomatic(moment.utc(data[0].timeoff).format(' HH:mm'),moment.utc(data[1].timeon).format(' HH:mm'));
        return b.props.Getstatussetupautomatic(messages,messages);

    })
  }
  // _showDateTimePicker = () => this.props.Start_DateTime());

  _hideDateTimePicker = () => {
    var data = {id:2,timeon:null}
    var messages = 'Chưa được thiết lập'
    this.socket.emit("setupautomatically",data)
    this.props.Setupautomaticon(messages)
  };

  _handleDatePicked = (on) => {
    var m = moment(on);
    var time = m.milliseconds() + 1000 * (m.seconds() + 60 * (m.minutes() + 60 * m.hours()));
    var timehienthi = moment.utc(time).format(' HH:mm')
    var data = {id:2,timeon:time}
    this.socket.emit("setupautomatically",data)
    this.props.Setupautomaticon(timehienthi)
  };
  _showDateTimePicker1 = () => this.setState({ isDateTimePickerVisible1: true });

  _hideDateTimePicker1 = () => {
    var data = {id:1,timeoff:null}
    var messages = 'Chưa được thiết lập'
    this.socket.emit("setupautomatically",data)
    this.props.Setupautomaticoff(messages)
  };

  _handleDatePicked1 = (off) => {
    var m = moment(off);
    var time = m.milliseconds() + 1000 * (m.seconds() + 60 * (m.minutes() + 60 * m.hours()));
    var timehienthi = moment.utc(time).format(' HH:mm')
    var data = {id:1,timeoff:time}
    this.socket.emit("setupautomatically",data)
    this.props.Setupautomaticoff(timehienthi)
  };
  render(){
    return(

      <View style={style.container}>
          <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}>
            <Image  style={{flex:1 ,width:Dimensions.get('window').width,height:Dimensions.get('window').height}} source={require('../../public/icon/mua3.jpg')} />
          </View>
          <View style={style.timeon}>
                  <TouchableOpacity onPress={()=>this.props.ShowDateTime()}>
                    <Text style={style.item}>Thiết lập thời gian bật đèn</Text>
                  </TouchableOpacity>
                  <Text style={style.item}>{this.props.timeon}</Text>
                  <DateTimePicker
                    isVisible={this.props.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode={'time'}
                  />
          </View>
          <View style={style.timeoff}>
                  <TouchableOpacity onPress={()=>this.props.ShowDateTime1()}>
                    <Text style={style.item}>Thiết lập thời gian tắt đèn</Text>
                  </TouchableOpacity>
                  <Text style={style.item}>{this.props.timeoff}</Text>
                  <DateTimePicker
                    isVisible={this.props.isDateTimePickerVisible1}
                    onConfirm={this._handleDatePicked1}
                    onCancel={this._hideDateTimePicker1}
                    mode={'time'}
                  />
          </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection:'column',
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5
  },
  timeon:{
    flex:0.1,
    flexDirection:'column',
    alignItems:'center'

  },
  timeoff:{
    flex:0.1,
    flexDirection:'column',
    alignItems:'center'
  },
  item:{
    fontSize:20,
    color:'#FFF',
    fontFamily:'Oswald-Regular'
  }
})
const mapStateToProps = state =>({
  statussetupautomatic : state.statussetupautomatic,
  timeon:state.timeon,
  timeoff:state.timeoff,
  isDateTimePickerVisible:state.isDateTimePickerVisible,
  isDateTimePickerVisible1:state.isDateTimePickerVisible1

})
export default connect(mapStateToProps,{Getstatussetupautomatic,Setupautomaticon,Setupautomaticoff,ShowDateTime,ShowDateTime1})(Setupautomatically)
