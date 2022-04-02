import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../styles';

function FullButton({title, onPress, style, icon, loading, titleStyle}){
    return(
        <TouchableOpacity
            onPress={onPress ? onPress : null}
            style={[styles.FullButton, style]}
            disabled={loading}
        >
            {loading ?
                <ActivityIndicator 
                    size='small'
                    color={colors.WHITE}
                /> 
            :
                <Text numberOfLines={1} style={[styles.title, titleStyle]} >{title} {icon ? icon : null}</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    FullButton:{
        borderRadius:12,
        backgroundColor:colors.PRIMARY,
        alignItems:'center',
        height:46,
        justifyContent:'center',
        marginVertical:15,

        marginTop:30
    },

    title:{
        fontFamily:'Asap-Bold',
        color:colors.WHITE
    }
})

export default FullButton