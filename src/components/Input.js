import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconButton } from '.';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';

function Input(props){

    const globalStyle = useGlobalStyle(AppStore.language)
  
    const phoneInput = React.useRef(null)

    const [showPass, SetshowPass] = React.useState(false)

    let sectionHeight = 46;

    if(props?.wrapperStyle?.style?.height){
        sectionHeight = props.wrapperStyle.style.height
    }

    return(
        <View style={[{flexDirection:'row', height:sectionHeight, flex:1, alignItems:'center', paddingHorizontal:20, borderWidth:1, borderRadius:12, borderColor:colors.GRAY_ICON}, props.inputWrapper, props.error ? {borderColor:colors.RED, } : {},]} >

            {props.prefix ? 
                <>
                    {props.prefix}
                </>
            : null }

            {props.mode == 'picker' ?
                <TouchableOpacity onPress={props.onPress} style={[globalStyle.input, {justifyContent:'center', flex:1, padding:0, height:sectionHeight}]} >
                    
                    <Text numberOfLines={1} style={[globalStyle.input, {color:props.value ? colors.FONT_COLOR : "#BBBBBB"}]} >{props.value ? props.value : props.placeholder}</Text>

                </TouchableOpacity>
            :
                <>
                    {props.type == 'phone' ?
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={props.value}
                            defaultCode="BD"
                            disableArrowIcon
                            layout="second"
                            // onChangeCountry={() => {
                            //     setTimeout(() => {
                            //         props.onChangeText(phoneInput.current?.getNumberAfterPossiblyEliminatingZero(text).formattedNumber)
                            //     }, 500)
                            // }}
                            onChangeFormattedText={text => {
                                setTimeout(() => {
                                    props.onChangeText(phoneInput.current?.getNumberAfterPossiblyEliminatingZero(text).formattedNumber)
                                }, 500)
                            }}
                            // onChangeText={text => {
                            //     console.log(text)
                            //     setTimeout(() => {
                            //         props.onChangeText(phoneInput.current?.getNumberAfterPossiblyEliminatingZero(text).formattedNumber)
                            //     }, 500)
                                
                            // }}
                            containerStyle={{
                                backgroundColor:'transparent', 
                                alignItems:'center',
                                // height:sectionHeight
                            }}
                            textContainerStyle={{
                                backgroundColor:'transparent',
                                // padding:0,
                                // height:sectionHeight
                            }}
                            textInputStyle={{
                                height:sectionHeight
                            }}
                            placeholder={props.placeholder}
                            
                        />
                    :
                        <TextInput 
                            placeholderTextColor={colors.PLACEHOLDER}
                            style={[globalStyle.input, {flex:1, padding:0, height:sectionHeight}]}
                            {...props}
                            onFocus={e => console.log(e.nativeEvent)}
                            secureTextEntry={props.type == 'password' ? !showPass : false}
                        />
                    }
                </>
            }

            {props.type == 'password' ?
                <IconButton 
                    icon={showPass ? 'eye' : 'eye-slash'}
                    onPress={() => SetshowPass(!showPass)}
                />
            : null}

            {(props.mode == 'picker' && !props.suffix) ?
                <Icon 
                    name='chevron-down'
                    color={colors.GRAY_ICON}
                    size={14}
                />
            : null }

            {props.suffix ? 
                <>
                    {props.mode == 'picker' ?
                        <TouchableOpacity onPress={props.onPress} >
                            {props.suffix}
                        </TouchableOpacity>
                    :
                        <>{props.suffix}</>
                    }
                </>
            : null }
        </View>
    );
}

const styles = StyleSheet.create({


})

export default Input