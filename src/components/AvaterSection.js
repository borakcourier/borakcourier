import * as React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

function AvaterSection({title, subTitle, image, onPress}){

    const globalStyle = useGlobalStyle()

    return(
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.AvaterSection, globalStyle.shadow]} 
        >
          <Image 
            source={require('./../assets/images/placeholder.jpg')}
            style={{height:50, width:50, borderRadius:30}}
          />
          <View style={{flex:1, marginLeft:10}} >
            <Text style={globalStyle.label} >{title}</Text>
            <Text style={globalStyle.textRegular} >{subTitle}</Text>
          </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    AvaterSection:{
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'#ddd',
        padding:10,
        margin:5,
        marginHorizontal:25
    },

})

export default AvaterSection