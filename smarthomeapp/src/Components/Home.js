import React, { Component } from 'react';
import {View, Text ,Dimensions , StyleSheet , ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { StartApp } from '../Redux/ActionCreators';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Monitoring from './monitoring';
import Setupautomatically from './setupautomatically';
const {width,height} = Dimensions.get('window');
const initialLayout = {
height: 0,
width
};
class Home extends Component{
  constructor(props){
    super(props)


  }
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Monitoring' },
      { key: 'second', title: 'Setup Automatically' },
    ],
  };
  componentWillMount(){
    this.props.StartApp();
  }
  _renderTabBar = props => (
    <TabBar {...props} style={style.tabbar} labelStyle={style.label} indicatorStyle={style.indicator} />
  );
  _renderScene = SceneMap({
    first: Monitoring,
    second: Setupautomatically,
 });
  render(){

    if(this.props.isLoading){
      return(
        <View style={{flex:1,backgroundColor:'#1d366d',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      );
    }
    return(
      <TabView
        style={style.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={initialLayout}
      />
    );
  }
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1E90FF'
  },
  indicator:{
    backgroundColor: '#FFF'
  },
  label: {
    color: '#fff',
    fontSize:17,
    fontFamily:'Oswald-Regular'
  }
})
const mapStateToProps = state => ({
  isLoading : state.isLoading
})
export default  connect(mapStateToProps,{StartApp})(Home)
