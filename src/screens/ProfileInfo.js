import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FullButton, LabeledShadowInput, InnerLayer } from '../components';
import { AppStore } from '../mobx/AppStore';
 
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import { Notify } from '../uti/utl';
import { Validate } from '../uti/validation';

const ProfileInfo = observer(function ProfileInfo({navigation}) {

  const globalStyle = useGlobalStyle(AppStore.language)

  const [validation, Setvalidation] = React.useState({})

  const [ alertMessage, SetalertMessage ] = React.useState("")

  const [passData, SetpassData] = React.useState({
    newPassword:"",
    confirmPassword:"",
    currentPassword:""
  })

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
    >
      <ScrollView style={styles.wrapper} >

        <LabeledShadowInput 
          label="First Name"
          onChangeText={text => SetpassData({...passData, ...{currentPassword:text}})}
          value="Delowar Hossain"
          error={validation.currentPassword}
       />

        <LabeledShadowInput 
          label="Last Name"
          onChangeText={text => SetpassData({...passData, ...{newPassword:text}})}
          value="Hossain"
          error={validation.newPassword}
       />

        <LabeledShadowInput 
          label="Email"
          onChangeText={text => SetpassData({...passData, ...{confirmPassword:text}})}
          value="deliowar@yahoo.com"
          error={validation.confirmPassword}
       />

      <LabeledShadowInput 
          label="Date of Birth"
          onChangeText={text => SetpassData({...passData, ...{confirmPassword:text}})}
          value="12 January 1994"
          error={validation.confirmPassword}
       />

        <FullButton 
          title={"Submit"}
          onPress={() => {}}
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

export default ProfileInfo;