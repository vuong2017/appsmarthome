import React, { Component } from 'react';
import { View , StyleSheet , Text } from 'react-native';
import {connect} from 'react-redux';
class Timestatisticsonoff extends Component{
  render(){
    return(
        <View style={styles.thoigianbattat}>
            <View style={styles.thoigianbattatitem}><Text style={{fontSize:25,fontFamily:'Oswald-Regular',color:'white'}}>Lịch Sử Hoạt Động : </Text></View>
            <View style={styles.thoigianbattatitem}><Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Bật đèn gần nhất : <Text style={{fontWeight:'bold'}}>{this.props.timeonoff.thoigianbat}</Text></Text></View>
            <View style={styles.thoigianbattatitem}><Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Tắt đèn gần nhất : <Text style={{fontWeight:'bold'}}>{this.props.timeonoff.thoigiantat}</Text></Text></View>
        </View>
    );
  }
}
const styles  = StyleSheet.create({
  thoigianbattat : {
    flexDirection:'column',
    borderColor:'white',
    borderWidth:1.5,
    borderWidth:2
  },
  thoigianbattatitem : {
    flex:0.5,
    justifyContent:'center',
    alignItems:'center'
  }
})
const mapStateToProps = state =>({
  timeonoff:state.timeonoff
})
export default connect(mapStateToProps)(Timestatisticsonoff)
