import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CardNav, InnerLayer } from '../components';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import { resetKey } from '../uti/utl';

const Profile = observer(function Profile({navigation}) {

  const globalStyle = useGlobalStyle(AppStore.language)
  const [profileImageUrl, SetprofileImageUrl] = React.useState('')

  const { user, loggedUser } = AppStore.authInfo

  const Logout = () => {

    AppStore.UpdateauthInfo({
      user:{},
      phone:"",
      password:""
    })

    resetKey('authInfo')
    navigation.navigate('Login')
    
  }

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
      title="Profile"
    >

      {/* <View style={{flex:1, alignItems:'center', justifyContent:'center'}} >
        <Text>Coming Soon</Text>
      </View> */}

      <View style={{height:55, backgroundColor:colors.PRIMARY, justifyContent:'center'}} >
        <Text style={{fontWeight:"500", paddingHorizontal:20, color:'white', fontSize:20}} >Profile</Text>
      </View>
      
      <ScrollView style={styles.wrapper} >

        {/* <View style={styles.proImgWrapper} >

          <Image 
            style={styles.proImg}
            source={require('./../assets/images/avaterplaceholder.png')}
          />
          
          <TouchableOpacity  style={[globalStyle.shadow, styles.pickerBtn]} >
            <Icon name='pen' size={10} color={colors.GRAY_ICON} />
          </TouchableOpacity>

        </View>


        <CardNav 
          title={"Profile Information"}
          body="View and edit your information"
          onPress={() => navigation.navigate('ProfileInfo')}
        />

        <CardNav 
          title="Saved Address"
          body="View and edit your address"
          onPress={() => navigation.navigate('Address')}
        />

        <CardNav 
          title="Update Password"
          body="update youe password"
          onPress={() => navigation.navigate('UpdatePassword')}
        /> */}

      <CardNav 
          title="Logout"
          body="Dismiss your session and clear token"
          onPress={Logout}
        />

        <View style={{height:150}} />
        
      </ScrollView>

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper:{
    padding:25
  },

  proImgWrapper:{
    marginVertical:15,
    alignSelf:'center'
  },

  proImg:{
    height:131,
    width:131,
    borderRadius:66,
    marginBottom:20
  },

  pickerBtn:{
    position:'absolute',
    height:31,
    width:31,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.WHITE,
    borderRadius:16,
    right:5,
    top:5
  },

  name:{
    fontSize:18,
    textAlign:'center',
    fontFamily:'Asap-Bold',
    color:colors.FONT_COLOR,
    marginVertical:10
  },

  stats:{
    padding:18,
    backgroundColor:colors.PRIMARY,
    borderRadius:18,
    marginVertical:6
  },

  donateIcon:{
    height:34,
    width:34,

  },

  statsMiddleText:{
    fontSize:18,
    lineHeight:25,
    color:colors.WHITE,
    fontFamily:'Asap-Bold',
    marginTop:12,
    marginBottom:6
  },

  statsBtmText:{
    fontSize:13,
    lineHeight:20,
    color:colors.WHITE,
    fontFamily:'Asap-Bold',
  },

  contraText:{
    fontSize:16,
    lineHeight:20,
    color:colors.WHITE,
    fontFamily:'Asap-SemiBold',
    marginBottom:14
  }

})

export default Profile;