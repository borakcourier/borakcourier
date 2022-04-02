import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../styles';

function GreenCard({title, subTitle, subTitleColor, titleColor, onPress, background, btnBg, arrowColor}){
    return(
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.greenCard, background ? {backgroundColor:background} : {}]} 
        >
          <View style={styles.textSection} >
            <Text numberOfLines={1} style={[styles.title, titleColor ? {color:titleColor} : {}]} >{title}</Text>
            {subTitle ?
                <Text style={[styles.subTitle, subTitleColor ? {color:subTitleColor} : {}]} >{subTitle}</Text>
            : null }
          </View>
          <View  style={[styles.btn, btnBg ? {backgroundColor:btnBg} : {}]} >
            <Icon name='arrowright' size={20} color={arrowColor || colors.WHITE} />
          </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    greenCard:{
        height:95,
        paddingHorizontal:20,
        backgroundColor:colors.PRIMARY,
        borderRadius:25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:15
    },

    btn:{
        width:52,
        height:67,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.DARK_PRIMARY,
        borderRadius:15
    },

    textSection:{
        flex:1,
        justifyContent:'center',
        marginRight:5
    },

    title:{
        fontFamily:'Asap-Bold',
        fontSize:16,
        color:colors.WHITE,
    },

    subTitle:{
        color:colors.WHITE,
        marginTop:11

    }

})

export default GreenCard