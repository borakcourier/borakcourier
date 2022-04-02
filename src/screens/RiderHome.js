import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { TextArea, TextField } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CardNav, FullButton, IconButton, InnerLayer, LabeledShadowInput } from '../components';
import CustomTable from '../components/Table';
import { AppStore } from '../mobx/AppStore';
import AllAPIs from '../services/AllAPIs';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

// import { Table, Row, Rows } from 'react-native-table-component-2';


const RiderHome = observer(function RiderHome({ navigation }) {

  const globalStyle = useGlobalStyle(AppStore.language)

  const { user, loggedUser } = AppStore.authInfo

  const [ histories, Sethistories ] = React.useState([])

  React.useEffect(() => LoadHis() , [])

  const LoadHis  = async () => {
    Sethistories( await AllAPIs.percel.MyPercelHistories(AppStore) )
  }


  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
      title="My delivery list"
    >

      <FlatList 
        data={histories}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <View style={[globalStyle.shadow, styles.RiderHome]} > 
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <View>
                <Text>Merchant: {item.merchent_name}</Text>
                <Text>{item.merchent_cotact}</Text>
              </View>
              <View>
                <Text>Customer: {item.customer_name}</Text>
                <Text>{item.customer_contact}</Text>
              </View>
              
            </View>
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >Product Price: {item.product_price}</Text>
              <Text style={globalStyle.textBold} >Delivery Charge: {item.delivery_charge}</Text>
            </View>
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text numberOfLines={1} style={globalStyle.textBold} >P-Area: {item.pickup_police_station_name}</Text>
              <Text style={globalStyle.textBold} >P-time: {item.pickup_date} - {item.pickup_time}</Text>
            </View>
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >D-Area: {item.delivery_police_station_name}</Text>
              <Text style={globalStyle.textBold} >D-time: {item.delivery_date} - {item.delivery_time}</Text>
            </View>

            {/* <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >P/S: {item.PS}</Text>
              <Text style={globalStyle.textBold} >D/S: {item.DS}</Text>
              <Text style={globalStyle.textBold} >Delivert By: {item.dBy}</Text>
            </View> */}
            
          </View>
        }
      />

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper: {
    padding: 25
  },

  RiderHome: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 7.5,
    borderRadius: 10
  },

  chip: {
    padding: 5,
    borderRadius: 30,
  },
  gap: {
    marginVertical: 5
  },

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }

})

export default RiderHome;