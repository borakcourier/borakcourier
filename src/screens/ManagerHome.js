import { observer } from 'mobx-react-lite';
import moment from 'moment';
import * as React from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import { TextArea, TextField } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AvaterSection, CardNav, FullButton, IconButton, InnerLayer, LabeledShadowInput } from '../components';
import CustomTable from '../components/Table';
import { AppStore } from '../mobx/AppStore';
import AllAPIs from '../services/AllAPIs';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

// import { Table, Row, Rows } from 'react-native-table-component-2';


const ManagerHome = observer(function ManagerHome({ navigation }) {

  const globalStyle = useGlobalStyle(AppStore.language)

  const { user, loggedUser } = AppStore.authInfo

  const [ percelList, SetpercelList ] = React.useState([])

  // const [fromDate, SetfromDate] = React.useState(moment().format("YYYY-MM-DD"))
  const [fromDate, SetfromDate] = React.useState("2022-03-01")
  const [toDate, SettoDate] = React.useState(moment().format("YYYY-MM-DD"))

  const [dateShowFor, setdateShowFor] = React.useState('fromDate');
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date(1598051730000));

  const [AOIFRAM, SetAOIFRAM] = React.useState("") //activeOrderIdForRiderAssignModal

  const onChangeDate = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if(dateShowFor == 'from'){

        SetfromDate(moment(currentDate).format("YYYY-MM-DD"))
        
    }else{
      SettoDate(moment(currentDate).format("YYYY-MM-DD"))
    }
  };

  React.useEffect(() => {
    async function call(){

    }
    LoadPercel()
  } , [])

  const LoadPercel  = async () => {
    console.log("called")
    
    SetpercelList( await AllAPIs.percel.GetPercelForManager(AppStore, {
      "fromDate":fromDate,
      "toDate":toDate
    }) )
  }

  console.log("percellist", AOIFRAM)

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
    >
      <View style={[globalStyle.rowCenterAround, {paddingHorizontal:25}]} >
        <FullButton 
          title={`From ${fromDate}`}
          style={{flex:1, height:35, marginRight:5}}
          onPress={() => {
            setShow(true)
            setdateShowFor('fromDate')
          }}
          
        />
        <FullButton 
          title={`From ${toDate}`}
          style={{flex:1, height:35, marginLeft:5}}
          onPress={() => {
            setShow(true)
            setdateShowFor('toDate')
          }}
          
        />
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
            />
        )}

        {/* <LabeledShadowInput 
          placeholder="Select from date"
          value={fromDate}
          mode="picker"
          onPress={() => {
            setShow(true)
            setdateShowFor('fromDate')
          }}
          wrapperStyle={{flex:1}}
        />
        <LabeledShadowInput 
          placeholder="Select to date"
          value={toDate}
          mode="picker"
          onPress={() => {
            setShow(true)
            setdateShowFor('toDate')
          }}
          wrapperStyle={{flex:1}}
        /> */}
      </View>

      <FlatList 
        data={percelList}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <View style={[globalStyle.shadow, styles.ManagerHome]} > 
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

            <Text numberOfLines={1} style={globalStyle.textBold} >P-Area: {item.pickup_police_station_name}</Text>

            <Text style={globalStyle.textBold} >P-time: {item.pickup_date} - {item.pickup_time}</Text>

            <Text style={globalStyle.textBold} >D-Area: {item.delivery_police_station_name}</Text>

            <Text style={globalStyle.textBold} >D-time: {item.delivery_date} - {item.delivery_time}</Text>

            <FullButton 
              title="Assign Rider"
              onPress={() => SetAOIFRAM(item.id)}
            />

            {/* <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >P/S: {item.PS}</Text>
              <Text style={globalStyle.textBold} >D/S: {item.DS}</Text>
              <Text style={globalStyle.textBold} >Delivert By: {item.dBy}</Text>
            </View> */}
            
          </View>
        }
      />

      <Modal
        visible={AOIFRAM ? true : false}
        onRequestClose={() => SetAOIFRAM(false)}
        transparent={false}
        animationType='slide'
      >
        <View style={[globalStyle.rowCenter, {height:50, paddingHorizontal:25}]} >
          
          <Text numberOfLines={1} style={[globalStyle.label, {flex:1}]} >Select Rider</Text>
          <IconButton 
            icon="times"
            onPress={() => SetAOIFRAM(false)}
            size={20}
          />

        </View>
        <FlatList 
          data={[{name:"Rider Name", id:1, number:"01955555"}, {name:"Rider Name", id:1, number:"01955555"}]}
          renderItem={({item}) => 
            <AvaterSection 
              title={item.name}
              subTitle={item.number}
            />
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </Modal>

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper: {
    padding: 25
  },

  ManagerHome: {
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

export default ManagerHome;