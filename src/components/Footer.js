import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
    Dimensions, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppStore } from '../mobx/AppStore';
import { colors } from '../styles';
import { useGlobalStyle } from '../styles/globalStyles';


const { width, height } = Dimensions.get('window')

const Footer = observer(({ children, HomeScrollRef }) => {

    const globalStyle = useGlobalStyle(AppStore.language)   
    const navigation = useNavigation();
    const route = useRoute();

    const tabList = [
        { name: 'Dashboard', screen: 'Dashboard', icon: 'home' },
        { name: 'Profile', screen: 'Profile', icon: 'user' },
    ]

    const onPressFooterButton = (screen) => {

        if (route.name == screen) {

            if (HomeScrollRef) {
                HomeScrollRef.current.scrollTo({
                    y: 0,
                    animated: true
                });
            }

            return null

        }

        navigation.navigate(screen)

    }

    return (
        <View style={styles.footer}>
            <View style={styles.absoluteBandage} />

            <Image
                style={styles.footerBg}
                source={require('./../assets/images/bigfooter.png')}
            />

            <View style={styles.footerBtns} >
                {tabList.map((tabData, index) =>
                    <TouchableOpacity
                        onPress={() => onPressFooterButton(tabData.screen)}
                        style={[styles.footerBtn, { backgroundColor: tabData.screen == route.name ? colors.LIGHT_PRIMARY : 'transparent' }]}
                        key={index}
                    >
                        <Icon name={tabData.icon} color={tabData.screen == route.name ? colors.PRIMARY : colors.GRAY_ICON} />
                        <Text style={[styles.footerBtnText, { color: tabData.screen == route.name ? colors.PRIMARY : colors.GRAY_ICON }]} >{tabData.name}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.middleBtnWrapper} >
                <View
                    style={[globalStyle.shadow, styles.middleBtn]}
                    onPress={() => { }}
                >
                    {/* <Image 
                        source={require('./../assets/images/icons/dish.png')}
                        style={styles.dishIcon}
                    /> */}
                    <Icon 
                        name='barcode'
                        size={25}
                        color={colors.WHITE}
                    />
                    <Text style={styles.shareText} >Share</Text>
                </View>
            </View>
        </View>
    );
})

const styles = StyleSheet.create({

    footer: {
        // backgroundColor:colors.WHITE,
        width: width,
        position: 'absolute',
        bottom: -10,
        paddingBottom:10,
        alignSelf: 'center',
    },

    footerBg: {
        // height:113,
        width: 2259,
        height: 60,
        alignSelf: 'center',
        position: 'absolute',
        // bottom: height < 1000 ? -30 :  -20
    },

    absoluteBandage: {
        backgroundColor: colors.WHITE,
        position: 'absolute',
        width: 2500,
        height: 90,
        // bottom: height < 1000 ? -60 :  -50,
        bottom: -60,
        alignSelf: 'center'
    },

    middleBtnWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        // bottom:height < 1000 ? 40 :  50,
        bottom: 50,
        // backgroundColor: colors.PRIMARY

    },

    dishIcon: {
        width: 20,
        height: 15,
        marginBottom: 6

    },
    shareText: {
        fontSize: 12,
        color: colors.WHITE,
        fontFamily: 'Asap-Bold'
    },

    footerBtns: {
        // height: height < 1000 ? 71 :  83,
        height: 71,
        // width:100,
        // backgroundColor:'red',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width > 320 ? 31 : 15
    },

    footerBtn: {
        height: 40,
        paddingHorizontal:15,
        backgroundColor: colors.LIGHT_PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'row',
    },

    footerBtnText: {
        fontFamily: 'Asap-Medium',
        color: colors.PRIMARY,
        marginLeft: 7,
        fontSize: 14,
        lineHeight: 16
    },

    middleBtnImage: {
        height: 150,
        width: 150,
    },

    middleBtn: {
        height: 71,
        width: 71,
        backgroundColor:colors.PRIMARY,
        borderRadius: 36,
        shadowRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },


})

export default Footer