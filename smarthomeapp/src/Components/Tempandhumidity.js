import React, { Component } from 'react';
import { View , StyleSheet , Image , Text } from 'react-native';
import {connect} from 'react-redux';
class Tempandhumidity extends Component{
  render(){
    return(
      <View style={styles.nhietdodoam}>
        <View style={styles.itemnhietdo}>

          <View style={{flex:0.6,flexDirection:'row' ,alignItems:'flex-end' }}>
          <View style={{flex:0.1}}>

          </View>
          <View style={styles.itemnhietdo1}>
            <Image source={require('../../public/icon/sun.png')} />
          </View>
          <View style={styles.itemnhietdo2}>
            <Text style={{fontSize:40,fontFamily:'Oswald-Regular',color:'white'}}>{this.props.datasensor[0].sensor.valueTemp}°C</Text>
          </View>
          <View style={{flex:0.1}}>

          </View>
          </View>
          <View style={styles.itemnhietdo3}>
            <Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Nhiệt độ hôm nay</Text>
          </View>
        </View>
        <View style={styles.itemdoam}>
            <View style={styles.itemdoam1}>
              <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:30,fontFamily:'Oswald-Regular',color:'white'}}>{this.props.datasensor[0].sensor.valueHumidity}%</Text>
              </View>
              <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Độ ẩm hôm nay</Text>
              </View>
            </View>
            <View style={styles.itemdoam2}>
            <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:30,fontFamily:'Oswald-Regular',color:'white'}}>{this.props.datasensor[0].sensor.valueAir == 0 ? 'Không' : 'Có'}</Text>
            </View>
            <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Mưa</Text>
            </View>
            </View>
        </View>
      </View>
    );
  }
}


const styles  = StyleSheet.create({
    nhietdodoam : {
      flex:0.3 ,
      flexDirection : 'row',
      paddingBottom:10
    },
    itemnhietdo :{
      flex: 0.6,
      padding:5,
      borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 5,
    flexDirection:'column',
    alignItems:'center'
    },
    itemnhietdo1 : {flex:0.3 , alignItems:'center' },
    itemnhietdo2 : {flex:0.5  , alignItems:'center' },
    itemnhietdo3 : {flex:0.4,flexDirection:'column' , alignItems:'center'  , paddingTop:15},
    itemdoam : {
      flex:0.4,
      flexDirection:'column',
      paddingLeft:5
    },
    itemdoam1 :{flex:0.5,borderWidth:1.5,borderColor: 'white',borderRadius: 5,marginBottom:5},
    itemdoam2 : {flex:0.5,borderWidth:1.5,borderColor: 'white',borderRadius: 5}
})


const mapStateToProps = state => ({
  datasensor: state.datasensor
})


export default connect(mapStateToProps)(Tempandhumidity);
