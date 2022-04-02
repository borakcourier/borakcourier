import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { TextArea, TextField } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CardNav, FullButton, IconButton, InnerLayer, LabeledShadowInput } from '../components';
import CustomTable from '../components/Table';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

// import { Table, Row, Rows } from 'react-native-table-component-2';


const DeliverySchedule = observer(function DeliverySchedule({ navigation }) {

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
      title="DeliverySchedule"
    >
      <View style={{ paddingHorizontal: 15, backgroundColor:'white' }} >

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
      />

      {/* <FlatList 
        data={data}
        renderItem={({item}) => 
          <View style={[globalStyle.shadow, styles.DeliverySchedule]} > 
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >ID#{item.id}</Text>
              <Text style={globalStyle.textBold} >Merchant: {item.name}</Text>
            </View>
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >P-Area: {item.pArea}</Text>
              <Text style={globalStyle.textBold} >P-time: {item.pTime}</Text>
            </View>
            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >D-Area: {item.dArea}</Text>
              <Text style={globalStyle.textBold} >D-time: {item.dTime}</Text>
            </View>

            <View style={[globalStyle.rowCenterBetween, styles.gap]} >
              <Text style={globalStyle.textBold} >P/S: {item.PS}</Text>
              <Text style={globalStyle.textBold} >D/S: {item.DS}</Text>
              <Text style={globalStyle.textBold} >Delivert By: {item.dBy}</Text>
            </View>
            
          </View>
        }
      /> */}

    </InnerLayer>
  );
})

const styles = StyleSheet.create({

  wrapper: {
    padding: 25
  },

  DeliverySchedule: {
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

export default DeliverySchedule;