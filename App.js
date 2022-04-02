// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { AppStore } from './src/mobx/AppStore';
import PostOrder from './src/screens/PostOrder';
import Dashboard from './src/screens/Dashboard';
import Profile from './src/screens/Profile';
import UpdatePassword from './src/screens/UpdatePassword';
import ProfileInfo from './src/screens/ProfileInfo';
import Address from './src/screens/Address';
import RoadMap from './src/screens/RoadMap';
import MerchantPayment from './src/screens/MerchantPayment';
import DeliverySchedule from './src/screens/DeliverySchedule';
import ChatScreen from './src/screens/Chat';
import Login from './src/screens/Login';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import SignUp from './src/screens/SignUp';
import { colors } from './src/styles';
import { Home } from './src/screens/Home';
import Toast from 'react-native-toast-message';

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import { getKey } from './src/uti/utl';
import MyPercelHistory from './src/screens/MyPercelHistory';
import ManagerHome from './src/screens/ManagerHome';
import RiderHome from './src/screens/RiderHome';


const LoadingScreen = observer(function LoadingScreen({navigation}) {

  // const navigation = useNavigation()

  React.useEffect(() => {

    async function call(){

      const authInfo = await getKey('authInfo');

      if(authInfo){

        AppStore.UpdateauthInfo(authInfo)

        if(authInfo.user.user_level == 3){
          navigation.navigate("ManagerHome")
          return null
        }
        
        if(authInfo.user.user_level == 2){
          navigation.navigate("RiderHome")
          return null
        }
        
        navigation.navigate("Dashboard")

      }else{     

        navigation.navigate("Login")

      }

    }

    call()

  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator 
        color={colors.BLACK}
        size='large'
      />
    </View>
  );
})

const Stack = createNativeStackNavigator();

const  App = observer(() => {

  React.useEffect(() => {

    setCustomText({
      style: {
        // backgroundColor: '#d3d3d3',
        fontFamily:"Roboto-Regular",
        fontSize:11
      }
    });

  }, [])

  return (
    <ActionSheetProvider>
      <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LoadingScreen'
          screenOptions={{
            headerStyle: {
              backgroundColor:colors.PRIMARY,
            },
            headerTintColor:colors.WHITE,
            headerTitleStyle: {
              color:colors.WHITE,
            },
          }}
          // screenOptions={{
          //   headerShown:false
          // }}
        >

          
          
          {AppStore.authInfo.phone ?

          <>

            {/* manager screen */}
            <Stack.Screen 
              name="ManagerHome" 
              component={ManagerHome} 
              options={{ title: 'Manager Dashboard' }}
            />
            
            <Stack.Screen 
              name="Dashboard" 
              component={Home}
              options={{ title: 'Dashboard', headerShown:false }}
            />
            <Stack.Screen 
              name="Home" 
              component={Home}
              options={{ title: 'My home', headerShown:false }}
            />
            <Stack.Screen 
              name="ChatScreen" 
              component={ChatScreen}
              options={{ title: 'Chat with our customer support' }}
            />
            <Stack.Screen 
              name="PostOrder" 
              component={PostOrder} 
              options={{ title: 'Post Order' }}
            />
            <Stack.Screen 
              name="MyPercelHistory" 
              component={MyPercelHistory} 
              options={{ title: 'My Percels' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={Profile} 
              options={{ title: 'Profile', headerShown:false}}
            />
            <Stack.Screen 
              name="UpdatePassword" 
              component={UpdatePassword} 
              options={{ title: 'Update Password' }}
            />
            
            <Stack.Screen 
              name="ProfileInfo" 
              component={ProfileInfo} 
              options={{ title: 'Profile Information' }}
            />
            
            <Stack.Screen 
              name="Address" 
              component={Address} 
              options={{ title: 'Address' }}
            />

            

            {/* rider screen */}
            <Stack.Screen 
              name="RiderHome" 
              component={RiderHome} 
              options={{ title: 'Rider Dashboard' }}
            />

          <Stack.Screen  name="RoadMap"  component={RoadMap}  options={{ title: 'Road Map' }} />

          <Stack.Screen  name="MerchantPayment"  component={MerchantPayment}  options={{ title: 'Merchant Payment' }} />

          <Stack.Screen  
            name="DeliverySchedule"  
            component={DeliverySchedule}  
            options={{ 
              title: 'Delivery Schedule'
             }} 
            
          />

        </>
          :
        <>

          <Stack.Screen 
              name="LoadingScreen"  
              component={LoadingScreen}  
              options={{ headerShown:false }} 
            />

          <Stack.Screen  name="Login"  component={Login}  options={{ title: 'Login' }} />

          <Stack.Screen  name="SignUp"  component={SignUp}  options={{ title: 'Sign Up' }} />
        </>
        }

        </Stack.Navigator>
        
      </NavigationContainer>
      <Toast />
      </>
    </ActionSheetProvider>
  );
})

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;

// export default App;