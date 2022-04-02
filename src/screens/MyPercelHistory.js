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


const MyPercelHistory = observer(function MyPercelHistory({ navigation }) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("PostOrder")} >
          <Text style={{color:colors.WHITE}} >ADD</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const globalStyle = useGlobalStyle(AppStore.language)

  const { user, loggedUser } = AppStore.authInfo

  const [ histories, Sethistories ] = React.useState([])

  React.useEffect(() => LoadHis() , [])

  const LoadHis  = async () => {
    Sethistories( await AllAPIs.percel.MyPercelHistories(AppStore) )
  }

  const tableHead = ['merchant', 'id', 'pArea', "pTime", "PS", "dArea", "dTime", "dBy", "DS", "Action"];

  const [data, Setdata] = React.useState([
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
    { merchant: "Liton", id: "123", pArea: "Pollibo", pTime: "10:00 PM", PS: "", dArea: "DHaka", dTime: "12.00PM", dBy: "20", DS: "25" },
  ])
  // const convertedArray =  props.data.map(ele => Object.keys(ele).map((key) => [Number(key), ele[key]]) )

  const TableRight = ({index}) => {
    return (
      <View style={globalStyle.rowCenter} >
        <IconButton 
          icon='edit'
        />
        {index}
      </View>
    )
  }

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
      title="MyPercelHistory"
    >
      {/* <View style={{ paddingHorizontal: 15, backgroundColor:'white' }} >

        <View style={globalStyle.rowCenter} >
          <Icon  name='search' color={colors.FONT_COLOR} size={16} />
          <TextInput 
            placeholder='Search'
            style={{flex:1, marginLeft:10}}
          /> 
        </View>

      </View>

      <CustomTable
        tableHead={tableHead}
        data={data}
        widthArr={[100, 100, 100, 100, 120, 140, 160, 180, 100,]}
        right={TableRight}
      /> */}

      <FlatList 
        data={histories}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <View style={[globalStyle.shadow, styles.MyPercelHistory]} > 
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

  MyPercelHistory: {
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

export default MyPercelHistory;