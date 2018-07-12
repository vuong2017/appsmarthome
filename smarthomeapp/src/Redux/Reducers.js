const defaultState = {
  datasensor : null,
  isLoading : false,
  statusdevice : null,
  timeonoff : null,
  statistical:'',
  timeoff:null,
  timeon:null,
  isDateTimePickerVisible:false,
  isDateTimePickerVisible1:false
}

const Reducers = (state=defaultState,action) =>{
  switch (action.type) {
    case "Start_App":
      return {...state,isLoading:true};
    case "Getdatasensor":
      return {...state,isLoading:false,datasensor:action.datasensor};
    case "Getstatusdevice":
      return {...state,statusdevice:action.statusdevice};
    case "Gettimeonoff":
      return {...state,timeonoff:action.timeonoff};
    case "Getstatistical":
      return {...state,statistical:action.statistical};
    case "Getstatussetupautomatic":
      return {...state,timeoff:action.timeoff,timeon:action.timeon};
   case "Show_DateTime":
      return {...state,isDateTimePickerVisible:true};
    case "Show_DateTime1":
        return {...state,isDateTimePickerVisible1:true};
    case "Setupautomaticon":
      return {...state,timeon:action.timeon,isDateTimePickerVisible:false};
    case "Setupautomaticoff":
      return {...state,timeoff:action.timeoff,isDateTimePickerVisible:false};
    default:
      return state;
  }
}
export default Reducers;
