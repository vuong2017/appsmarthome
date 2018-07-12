export function StartApp(){
   return {
     type:"Start_App"
   };
}
export function Getdatasensor(datasensor){
   return {
     type:"Getdatasensor",
     datasensor
   };
}
export function Getstatusdevice(statusdevice){
  return {
    type:'Getstatusdevice',
    statusdevice
  }
}
export function Gettimeonoff(timeonoff){
  return {
    type:'Gettimeonoff',
    timeonoff
  }
}
export function Getstatistical(statistical){
  return {
    type:'Getstatistical',
    statistical
  }
}

export function Getstatussetupautomatic(timeoff,timeon){
  return {
    type:'Getstatussetupautomatic',
    timeoff,
    timeon
  }
}
export function ShowDateTime(){
  return{
    type:'Show_DateTime'
  }
}
export function ShowDateTime1(){
  return{
    type:'Show_DateTime1'
  }
}

export function Setupautomaticon(timeon){
  return{
    type:'Setupautomaticon',
    timeon
  }
}
export function Setupautomaticoff(timeoff){
  return{
    type:'Setupautomaticoff',
    timeoff
  }
}
