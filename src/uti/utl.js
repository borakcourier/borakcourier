import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, PermissionsAndroid, Platform } from "react-native";
import Toast from 'react-native-toast-message';

export const baseURL = "https://kirghiziafangyuan.com/biz_sol/index.php/api"
// export const baseURL = "https://www.bs-org.com/index.php/api"


export function CloneItem(data){
    return JSON.parse(JSON.stringify(data))
}

export function IsIos(){
  return Platform.OS == 'ios'
}


export function Confirm(onConfirm, msg){
    Alert.alert(
        "Are you sure?",
        msg ? msg : '',
        // "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: onConfirm}
        ]
    );
}

export function Notify(msg, type = 'success', duration, position, text2) {
    Toast.show({
        type: type,
        text1: msg,
        text2: text2,
        position: position || 'bottom',
        visibilityTime: duration || 2000,
        onPress: Toast.hide
    });
}

export async function getKey(itemName) {
    var itemValue = [];
    try {
      const value = await AsyncStorage.getItem(itemName);
      itemValue = JSON.parse(value);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
    return itemValue;
}
  
export async function setKey(itemname, value) {
    try {
        await AsyncStorage.setItem(itemname, JSON.stringify(value)); 
        }catch (error) {
        console.log("Error saving data" + error);
     }
}
  
export async function resetKey(itemname) {
    try {
        await AsyncStorage.removeItem(itemname);
    } catch (error) {
        console.log("Error resetting data" + error);
    }
}



export function camelToNormal(string) {

  return string.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })

}


export const GetPermission = async (permission, title, msg, callBack) => {

    if(Platform.OS !== 'android'){
      callBack ? callBack() : null
      return null
    }

    if(await PermissionsAndroid.check(permission)){
      callBack ? callBack() : null
      return null
    }

    try {
      const granted = await PermissionsAndroid.request(
        permission,
        {
          title: title,
          message: msg,
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callBack()
      } else {

      }
    } catch (err) {
      console.warn(err);
    }
  }


export async function SaveSignIn(awsLoginRes, AppStore, cb){

}

export async function ClearSignIn(AppStore, cb){
  

}

export function AuthorizedNav(AppStore, navigation, screen){

  const { loggedUser } = AppStore.authInfo

  if(loggedUser){
    navigation.navigate(screen)
  }else{
    AppStore.UpCD('loginNeededScreen', {
      showModal:true,
      screen:screen
    })
  }

}

export function ClearAuthNeedAndNav(AppStore, navigation, screen){

    AppStore.UpCD('loginNeededScreen', {
      showModal:false,
      screen:''
    })

    navigation.navigate(screen)

}

export const TimeFormat = "YYYY/MM/DD"


