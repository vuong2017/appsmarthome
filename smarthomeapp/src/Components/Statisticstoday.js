import React, { Component } from 'react';
import { View , StyleSheet , Text } from 'react-native';
import {connect} from 'react-redux';
class Statisticstoday extends Component{
  render(){
    return(
      <View style={styles.thongke}>
          <View style={styles.thongkeitem}><Text style={{fontSize:25,fontFamily:'Oswald-Regular',color:'white'}}>Thống Kê Hôm Nay : </Text></View>
          <View style={styles.thongkeitem}><Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Nhiệt độ cao nhất :  <Text style={{fontWeight:'bold'}}>{this.props.statistical[0].valueTempMax}°C</Text></Text></View>
          <View style={styles.thongkeitem}><Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Nhiệt độ thấp nhất : <Text style={{fontWeight:'bold'}}>{this.props.statistical[0].valueTempMin}°C</Text></Text></View>
          <View style={styles.thongkeitem}><Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Độ ẩm cao nhất : <Text style={{fontWeight:'bold'}}>{this.props.statistical[0].valueHumidityMax}%</Text></Text></View>
          <View style={styles.thongkeitem}><Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Độ ẩm thấp nhất : <Text style={{fontWeight:'bold'}}>{this.props.statistical[0].valueHumidityMin}%</Text></Text></View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  thongke : {
    flexDirection:'column',
    borderColor:'white',
    borderWidth:1.5,
    marginTop:10
  },
  thongkeitem:{
    flex:0.5,
    justifyContent:'center',
    alignItems:'center'
  }
})
const mapStateToProps = state => ({
  statistical : state.statistical
})
export default connect(mapStateToProps)(Statisticstoday)
