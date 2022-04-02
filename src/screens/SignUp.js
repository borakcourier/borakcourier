import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FullButton, LabeledShadowInput } from '../components';
import InnerLayer from '../components/InnerLayer';
import { AppStore } from '../mobx/AppStore';
import AllAPIs from '../services/AllAPIs';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import { Notify } from '../uti/utl';
import { Validate } from '../uti/validation';

let scrollPosition = {}

const SignUp = observer(function SignUp({navigation, route}) {

    const [submitData, SetsubmitData] = React.useState({
      phone:"",
      password:"",
      fullName:"",
      conPass:"",
      email:""
    })

    const [validation, Setvalidation] = React.useState([])
    const [loading, Setloading] = React.useState(false)

  const globalStyle = useGlobalStyle(AppStore.language)

  const formScroll = React.useRef(null)

  const Submit = () => {

    console.log("entered")

    if(submitData.password !== submitData.conPass){
      Notify("Confrim password didn't match", "error")
      return false
    }
    console.log("234")

    if(submitData.phone.length < 11){
      Notify("Invalid phone number", "error")
      return false
    }

    if(submitData.phone.length > 11){
      Notify("Invalid phone number, Don't use +88", "error")
      return false
    }

    const validateData = [
      {key:"fullName", required:true,  scrollPosition:scrollPosition.fullName},
      {key:"phone", required:true,  scrollPosition:scrollPosition.phone},
      {key:"email", required:true,  scrollPosition:scrollPosition.email},
      {key:"password", required:true, type:"password",  scrollPosition:scrollPosition.password},
      {key:"conPass", required:true, type:"conPass",  scrollPosition:scrollPosition.password}
    ]

    Validate(validateData, submitData, formScroll, Setvalidation, async () => {
      Setloading(true)
      const res = await AllAPIs.user.Signup(submitData)
      if(res){
        Notify("Signed up successfully! Let's sign in")
        navigation.navigate("Login")
      }
      Setloading(false)
    })

  }

  const UpdatesubmitData = (data) => {
    SetsubmitData({...submitData, ...data})
  }

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
    >
      <ScrollView 
        style={styles.wrapper}
        ref={formScroll} 
      >
        
        <Text style={globalStyle.pageTitle} >SignUp</Text>

        <LabeledShadowInput 
          label={"Full Name"}
          placeholder="TypeyourfullName"
          value={submitData.fullName}
          error={validation.fullName}
          onChangeText={text => UpdatesubmitData({fullName:text})}
          onLayout={event => scrollPosition.fullName = event.nativeEvent.layout.y}
        />     

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
          label={"Email"}
          placeholder="Type youre mail"
          value={submitData.email}
          error={validation.email}
          onChangeText={text => UpdatesubmitData({email:text})}
          onLayout={event => scrollPosition.email = event.nativeEvent.layout.y}
          type="email"
        />        

        <LabeledShadowInput 
          label={"Password "}
          placeholder="language.Typeyourpassword"
          value={submitData.password}
          error={validation.password}
          onChangeText={text => UpdatesubmitData({password:text})}
          onLayout={event => scrollPosition.password = event.nativeEvent.layout.y}
          type="password"
        />

      <LabeledShadowInput 
          label={"Confirm Password"}
          placeholder="language.Typeyourpassword"
          value={submitData.conPass}
          error={validation.conPass}
          onChangeText={text => UpdatesubmitData({conPass:text})}
          onLayout={event => scrollPosition.conPass = event.nativeEvent.layout.y}
          type="password"
        />

        <FullButton 
          title="Sign Up Now"
          onPress={Submit}
          loading={loading}
        />

        {/* <View style={[globalStyle.rowCenterBetween, { marginVertical:4 }]} >
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}
          >
            <Text style={globalStyle.greenText} >Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={globalStyle.rowCenter} 
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={globalStyle.greenText} >SignUp</Text>
            <Image 
              source={require('./../assets/images/icons/arrow-right-green.png')}  
              style={{width:15, height:8, marginLeft:6}}
            />
          </TouchableOpacity>
        </View> */}

        {/* <View style={[globalStyle.rowCenterBetween, { marginVertical:20 }]} >
          <Text style={styles.or} >Or</Text>
          <View style={styles.dashedBorder} />
        </View>

        <SignUpWithButton 
          title="SignUp with Mobile Number"
          image={require('./../../assets/images/phoneSignUp.png')}
        />

        <SignUpWithButton 
          title="SignUp with Google"
          image={require('./../../assets/images/googleSignUp.png')}
        />

        <SignUpWithButton 
          title="SignUp with Facebook"
          image={require('./../../assets/images/googleSignUp.png')}
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

export default SignUp;