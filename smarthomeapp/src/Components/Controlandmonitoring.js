import React, { Component } from 'react';
import { View , StyleSheet , Image , Text , Switch } from 'react-native';
import {connect} from 'react-redux';
class Controlandmonitoring extends Component{
  constructor(props){
    super(props);
    this.state = {isSwitchOn: false}
  }
  componentDidMount(){
    this.statusdevice();
  }
  statusdevice(){
    console.log(this.props.statusdevice);
    if(this.props.statusdevice==0) return this.setState({isSwitchOn:false});
    return this.setState({isSwitchOn:true});
  }
  showCalculation = (value) => {
    this.setState({isSwitchOn:value})
   if (this.state.isSwitchOn) {
       var status = 0;
       this.props.add.onoffdevice(status);
       this.props.add.socket.emit("statusdevice","xuly");
    }
    else {
     var status = 1;
     this.props.add.onoffdevice(status);
     this.props.add.socket.emit("statusdevice","xuly");
      }
    }
 // componentWillReceiveProps(nextProps){
 //   if(nextProps.xuly[0].status==0){
 //     this.setState((prevState)=>{
 //       return{
 //         isSwitchOn:false
 //       };
 //     })
 //   }
 //   else{
 //     this.setState((prevState)=>{
 //       return{
 //         isSwitchOn:true
 //       };
 //     })
 //   }
 //   }
  render(){
    return(
      <View style={styles.nhietdodoam}>
        <View style={{  flex:0.4,flexDirection:'column',paddingRight:5}}>
            <View style={styles.itemdoam1}>
              <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:30,fontFamily:'Oswald-Regular',color:'white'}}>{this.props.datasensor[0].sensor.valueGas == 0 ? 'Không' : 'Có'}</Text>
              </View>
              <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Khí Gas</Text>
              </View>
            </View>
            <View style={styles.itemdoam2}>
            <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:30,fontFamily:'Oswald-Regular',color:'white'}}>{this.props.datasensor[0].sensor.valueCO == 0 ? 'Không' : 'Có'}</Text>
            </View>
            <View style={{flex:0.5, justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:20,fontFamily:'Oswald-Regular',color:'white'}}>Cháy Nhà</Text>
            </View>
            </View>
        </View>
        <View style={styles.itemnhietdo}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:0.7 , justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:30,fontFamily:'Oswald-Regular',color:'white'}}>Đèn Led</Text>
              </View>
              <View style={{flex:0.3  , justifyContent:'center', alignItems:'center' , paddingTop:10}}>
              <Switch
                  value={this.state.isSwitchOn}
                  onValueChange={(value)=>this.showCalculation(value)}
              />
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
    itemdoam1 :{flex:0.5,borderWidth:1.5,borderColor: 'white',borderRadius: 5,marginBottom:5},
    itemdoam2 : {flex:0.5,borderWidth:1.5,borderColor: 'white',borderRadius: 5}
})
const mapStateToProps = state => ({
  datasensor:state.datasensor,
  statusdevice:state.statusdevice
})
export default connect(mapStateToProps)(Controlandmonitoring);
