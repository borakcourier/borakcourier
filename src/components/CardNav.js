import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from '.';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

function CardNav({title, body, onPress}){
    const globalStyle = useGlobalStyle(AppStore.language)
    return(
        <TouchableOpacity onPress={onPress} style={styles.Card} >
            <View>
                <Text style={[globalStyle.label, globalStyle.textBold]} >{title}</Text>
                <Text style={[globalStyle.regularText, {lineHeight:25}]} >{body}</Text>
            </View>
            <IconButton 
                color={colors.GRAY_ICON}
                icon="chevron-right"
                size={18}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    Card:{
        minHeight:82,
        paddingHorizontal:20,
        backgroundColor:colors.CARD_BG,
        borderRadius:18,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:6
    },
})

export default CardNav