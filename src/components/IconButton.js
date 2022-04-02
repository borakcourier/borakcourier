import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    Image,
    Pressable,
    StyleSheet, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../styles';

function IconButton({solid, onPress, color, size, icon, style, image, imageStyle, disabled}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[{height:30, width:30, alignItems:'center', justifyContent:'center'}, style]} 
            disabled={disabled}
        >
            {image ?
                <Image 
                    style={[{height:25, width:25}, imageStyle]}
                    source={image}
                />
            :
                <Icon solid={solid} name={icon} size={size ? size : 14} color={color ? color : colors.FONT_COLOR} />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
})

export default IconButton