import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CardNav, InnerLayer } from '../components';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

const RoadMap = observer(function RoadMap({navigation}) {

  const globalStyle = useGlobalStyle(AppStore.language)

  const { user, loggedUser } = AppStore.authInfo

  const [data, Setdata] = React.useState([
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
    {name:"Liton", avater:"", duty:[{time:"10:00 PM", id:"1001"}, {time:"11:00 PM", id:"1002"}]},
  ])

  return (
    <InnerLayer
      backNavigation={true}
      hideFooter={true}
      title="RoadMap"
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
          <View style={[globalStyle.shadow, styles.roadMap]} > 
            <View style={globalStyle.rowCenter} >
              <Image 
                source={require('./../assets/images/avaterplaceholder.png')}
                style={{height:30, width:30, borderRadius:25, marginRight:10}}
              />
              <Text style={{flex:1}} >{item.name}</Text>
              <View style={{marginLeft:20}} >
                  {item.duty.map((ele) =>
                    <Text >ID:{ele.id}, TIME:{ele.time}</Text>
                  )}
                </View>
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

  roadMap:{
    padding:15,
    marginHorizontal:20,
    marginVertical:7.5,
    borderRadius:10

  },

  chip:{
    padding:5,
    borderRadius:30,
  }

})

export default RoadMap;