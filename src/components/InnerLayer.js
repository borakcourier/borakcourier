import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../styles';
import Footer from './Footer';

function InnerLayer({children, hideFooter}){
    return(
        <View style={styles.wrapper} >

            <StatusBar animated={true} backgroundColor={colors.WHITE}  barStyle="dark-content" />

            <SafeAreaView style={styles.safeView} >
                <View style={[styles.innerContent]} >
                    {children}
                </View>
                {!hideFooter ? <Footer  /> : null}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:colors.WHITE,
        // backgroundColor:'red'
    },
    safeView:{
        flex:1,
    },
    innerContent:{
        backgroundColor:colors.WHITE,
        flex:1,
        overflow:'visible'

        // maxWidth:BASE_WIDTH,
        // alignSelf:'center'
    },

})

export default InnerLayer