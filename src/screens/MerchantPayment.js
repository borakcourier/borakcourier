import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CardNav, InnerLayer } from '../components';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

const MerchantPayment = observer(function MerchantPayment({navigation}) {

  const globalStyle = useGlobalStyle(AppStore.language)

  const { user, loggedUser } = AppStore.authInfo

  const [data, Setdata] = React.useState([
    {name:"Liton", id:"123", pro:23, del:23, tot:12, mp:23, md:45, total:23, MPA:23},
    {name:"Liton", id:"123", pro:23, del:23, tot:12, mp:23, md:45, total:23, MPA:23},
    {name:"Liton", id:"123", pro:23, del:23, tot:12, mp:23, md:45, total:23, MPA:23},
    {name:"Liton", id:"123", pro:23, del:23, tot:12, mp:23, md:45, total:23, MPA:23},
    {name:"Liton", id:"123", pro:23, del:23, tot:12, mp:23, md:45, total:23, MPA:23},
  ])

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
      title="MerchantPayment"
    >

<View style={{paddingHorizontal:15}} > 
        <TextField
          placeholder={'Search'}
          floatingPlaceholder
          onChangeText={() => console.log('changed')}
          enableErrors
          validate={['required', 'email', (value) => value.length > 6]}
          validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
          showCharCounter
          maxLength={30}
        />
      </View>
      
      <FlatList 
        data={data}
        renderItem={({item}) => 
          <View style={[globalStyle.shadow, styles.MerchantPayment]} > 
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text >ID#{item.id}</Text>
              <Text >{item.name}</Text>
            </View>
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >Payable</Text>
              <Text >Pro. {item.pro}, Del. {item.del}, Tot: {item.tot}</Text>
            </View>

            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >Amount(P): {item.mp}</Text>
              <Text style={globalStyle.textBold} >Amount(D): {item.md}</Text>
            </View>

            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >Total: {item.total}</Text>
              <Text style={globalStyle.textBold} >MPA: {item.MPA}</Text>
            </View>
            
          </View>
        }
      />

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper:{
    padding:25
  },

  MerchantPayment:{
    padding:15,
    marginHorizontal:20,
    marginTop:15,
    borderRadius:10
  },

  chip:{
    padding:5,
    borderRadius:30,
  },
  gap:{
    marginVertical:5
  }

})

export default MerchantPayment;