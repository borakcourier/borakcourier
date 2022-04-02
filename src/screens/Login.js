import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FullButton, LabeledShadowInput } from '../components';
import InnerLayer from '../components/InnerLayer';
import { AppStore } from '../mobx/AppStore';
import AllAPIs from '../services/AllAPIs';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import { setKey } from '../uti/utl';
import { Validate } from '../uti/validation';

let scrollPosition = {}

const Login = observer(function Login({navigation, route}) {

    const [submitData, SetsubmitData] = React.useState({
      phone:"",
      password:""
    })

    const [validation, Setvalidation] = React.useState([])
    const [loading, Setloading] = React.useState(false)

  const globalStyle = useGlobalStyle(AppStore.language)

  const UpdatesubmitData = (data) => {
    SetsubmitData({...submitData, ...data})
}

  const Submit = () => {

    const validateData = [
      {key:"phone", required:true,  scrollPosition:scrollPosition.phone},
      {key:"password", required:true, type:"password",  scrollPosition:scrollPosition.password}
    ]

    Validate(validateData, submitData, formScroll, Setvalidation, async () => {
      Setloading(true)
      const res = await AllAPIs.user.Login(submitData)
      if(res){
        const authInfo = {
          phone:submitData.phone,
          password:submitData.password,
          user:res
        }
        AppStore.UpdateauthInfo(authInfo)
        setKey('authInfo', authInfo)

        if(res.user_level == 2){
          navigation.navigate("RiderHome")
          return false
        }

        if(res.user_level == 3){
          navigation.navigate("ManagerHome")
          return false
        }
      }
      Setloading(false)

    })

  }

  const formScroll = React.useRef(null)

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
    >
      <ScrollView 
        style={styles.wrapper}
        ref={formScroll} 
      >
        
        <Text style={globalStyle.pageTitle} >Login</Text>
        

        <LabeledShadowInput 
          label={"Phone"}
          placeholder="Typeyourphone"
          value={submitData.phone}
          error={validation.phone}
          onChangeText={text => UpdatesubmitData({phone:text})}
          onLayout={event => scrollPosition.phone = event.nativeEvent.layout.y}
          // type="phone"
        />        

        <LabeledShadowInput 
          label={"Password"}
          placeholder="language.Typeyourpassword"
          value={submitData.password}
          error={validation.password}
          onChangeText={text => UpdatesubmitData({password:text})}
          onLayout={event => scrollPosition.password = event.nativeEvent.layout.y}
          type="password"
        />

        <FullButton 
          title="Login Now"
          onPress={Submit}
          loading={loading}
        />

        <View style={[globalStyle.rowCenterBetween, { marginVertical:4 }]} >
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
          >
            <Text style={globalStyle.greenText} >Forgot password?</Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={globalStyle.rowCenter} 
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={globalStyle.greenText} >Sign Up</Text>
            <Image 
              source={require('./../assets/images/icons/arrow-right-green.png')}  
              style={{width:15, height:8, marginLeft:6}}
            />
          </TouchableOpacity>
        </View>

        {/* <View style={[globalStyle.rowCenterBetween, { marginVertical:20 }]} >
          <Text style={styles.or} >Or</Text>
          <View style={styles.dashedBorder} />
        </View>

        <LoginWithButton 
          title="Login with Mobile Number"
          image={require('./../../assets/images/phoneLogin.png')}
        />

        <LoginWithButton 
          title="Login with Google"
          image={require('./../../assets/images/googleLogin.png')}
        />

        <LoginWithButton 
          title="Login with Facebook"
          image={require('./../../assets/images/googleLogin.png')}
        /> */}

        <View style={{height:100}} />

      </ScrollView>

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper:{
    padding:25
  },

  dashedBorder:{
    height:1,
    borderTopColor:colors.BORDER_COLOR,
    borderTopWidth:1,
    flex:1,
    marginLeft:8,
    borderStyle:"dotted",
    borderRadius: 1,
  },

  or:{
    fontFamily:'Asap-SemiBold',
    color:colors.GRAY_ICON,
    
  }

})

export default Login;