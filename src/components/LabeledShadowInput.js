import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';
import Input from './Input';

function LabeledShadowInput(props){
    const globalStyle = useGlobalStyle(AppStore.language)
    return(
        <View style={{marginTop:15}} >
            <Text style={[globalStyle.label, {marginBottom:10}]} >{props.label}</Text>
            <Input {...props} />
            {props.error ? <Text style={[globalStyle.regularText, globalStyle.textMedium, {color:colors.FONT_COLOR_LIGHT, marginTop:5, textTransform:'capitalize'}]} >{props.error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({


})

export default LabeledShadowInput