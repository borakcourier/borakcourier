import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FullButton, LabeledShadowInput, InnerLayer } from '../components';
import { AppStore } from '../mobx/AppStore';
 
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import { Notify } from '../uti/utl';
import { Validate } from '../uti/validation';

const UpdatePassword = observer(function UpdatePassword({navigation}) {

  const globalStyle = useGlobalStyle(AppStore.language)

  const [validation, Setvalidation] = React.useState({})

  const [ alertMessage, SetalertMessage ] = React.useState("")

  const [passData, SetpassData] = React.useState({
    newPassword:"",
    confirmPassword:"",
    currentPassword:""
  })

  const Submit = () => {

    if(passData.newPassword !== passData.confirmPassword){
      Notify("Confirm password didn't match", 'error')
      return null
    }

    const validateData = [
      {key:'newPassword', type:'password', required:true},
      {key:'confirmPassword', required:true},
      {key:'currentPassword', required:true},
    ]

    Validate(validateData, passData, null, Setvalidation, async () => {

      console.log("hello")

      const changePasswordRes = await AllAPIs.user.UpdatePassword(passData)

      // console.log(changePasswordRes)

      // return false

      if(changePasswordRes.error){
        SetalertMessage(changePasswordRes.error)
        return null;
      }
      
      if(changePasswordRes){

        SetshowPassChangeModal(false)
        Notify(language.Updated)

      }

    })

  }

  console.log(validation)

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
    >
      <ScrollView style={styles.wrapper} >

        <LabeledShadowInput 
          label="Current Password"
          onChangeText={text => SetpassData({...passData, ...{currentPassword:text}})}
          value={passData.currentPassword}
          secureTextEntry
          error={validation.currentPassword}
          type="password"
       />

        <LabeledShadowInput 
          label="New Password"
          onChangeText={text => SetpassData({...passData, ...{newPassword:text}})}
          value={passData.newPassword}
          secureTextEntry
          error={validation.newPassword}
          type="password"
       />

        <LabeledShadowInput 
          label="Confirm New Password"
          onChangeText={text => SetpassData({...passData, ...{confirmPassword:text}})}
          value={passData.confirmPassword}
          secureTextEntry
          error={validation.confirmPassword}
          type="password"
       />

        {alertMessage ?
          <View
            style={{
              backgroundColor:"rgba(255, 0, 0, 0.05);",
              minHeight:50,
              borderRadius:12,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <Text style={[globalStyle.textRegular, globalStyle.textCenter, {color:colors.RED, padding:20}]} >{alertMessage}</Text>
          </View>
        : null}

        <FullButton 
          title={"Submit"}
          onPress={Submit}
        />

      </ScrollView>
        
       

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper:{
    padding:25
  },

  divider:{
    height:8,
    backgroundColor:colors.CARD_BG
  },

  bottomWrapper:{
    paddingVertical:15,
    paddingHorizontal:25
  }

})

export default UpdatePassword;