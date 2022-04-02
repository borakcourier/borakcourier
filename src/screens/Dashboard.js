// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Pressable, FlatList, Dimensions, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../mobx/AppStore';
import { FullButton, InnerLayer, LabeledShadowInput } from '../components';
import { useGlobalStyle } from '../styles/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from 'react-native-reanimated';
import { colors } from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';
import AllAPIs from '../services/AllAPIs';

const {width, height} = Dimensions.get('window')

const Dashboard = observer(({ route}) => {

    const navigation = useNavigation()
    
    const globalStyle = useGlobalStyle(AppStore.language)  

    const [stat, SetStat] = React.useState({
        "deliveryStatus": {
            "deliveryOrder": "0",
            "delivered": "0",
            "canceled": 0,
            "pending": "0"
        },
        "paymentStatus": {
            "deliveryCharge": "0",
            "merchantPayment": "0",
            "merchantPaymentPaid": "0",
            "merchantPaymentDues": '0'
        }
    })

    React.useEffect(() => {

        LoadDashboardData()

    }, [])
    
    const LoadDashboardData = async () => {
        SetStat( await AllAPIs.user.dashboardStat(AppStore))
    }

    const {delivered, deliveryOrder, canceled, pending} = stat.deliveryStatus
    const commonSection = [
        {name:"Delivery Order", count:deliveryOrder, icon:"telegram", color:'#e90f6e', link:"MyPercelHistory"},
        {name:"Delivered", count:delivered, icon:"mendeley", color:'blue'},
        {name:"Canceled", count:canceled, icon:"plane", color:'green'},
        {name:"Pending", count:pending, icon:"buromobelexperte", color:'red'},
    ]

    const { deliveryCharge, merchantPayment, merchantPaymentDues, merchantPaymentPaid } = stat.paymentStatus
    const paymentSection = [
        {name:"Delivery Charge", count:deliveryCharge, icon:"telegram", color:'#e90f6e'},
        {name:"Marchant Payment", count:merchantPayment, icon:"mendeley", color:'blue'},
        {name:"Marchant Payment Paid", count:merchantPaymentPaid, icon:"plane", color:'green'},
        {name:"Marchant Payment Dues", count:merchantPaymentDues, icon:"buromobelexperte", color:'red'},
    ]

    return (
        <InnerLayer 
            hideFooter
        >
            
            <View
                style={styles.dashboardHead}
            >

                <Pressable
                    onPress={() => navigation.navigate("Profile")}
                >
                    <FontAwesome5 
                        name="user-circle"
                        color={colors.WHITE}
                        size={60}
                        solid
                    />
                </Pressable>

                <View style={styles.headMiddle} >
                    {/* <Text style={[globalStyle.label, globalStyle.textWhite]} >Delowar Hossain</Text>
                    <View style={styles.bal} >
                        <View style={styles.balIcon} >
                            <Text style={[globalStyle.textWhite, globalStyle.textBold, globalStyle.textSm ]}>$</Text>
                        </View>
                        <Text style={globalStyle.textBold} >See Balance</Text>
                    </View> */}
                    <View 
                        style={{alignItems:'center', justifyContent:'center', marginHorizontal:10}}
                    >
                        <FontAwesome5 
                            name="bicycle"
                            color={colors.WHITE}
                            size={25}
                        />
                        <Text style={{color:colors.WHITE}} >Courrier</Text>
                    </View>
                    <View 
                        style={{alignItems:'center', justifyContent:'center', marginHorizontal:10}}
                    >
                        <MaterialIcons 
                            name="attach-money"
                            color={colors.WHITE}
                            size={25}
                        />
                        <Text style={{color:colors.WHITE}} >Accounting</Text>
                    </View>
                </View>

                {/* <Pressable style={styles.rightBtn} >
                    <FontAwesome5 
                        name="star"
                        color={colors.WHITE}
                        size={30}
                    />
                </Pressable>

                <Pressable style={styles.rightBtn} >
                    <FontAwesome5 
                        name="coins"
                        color={colors.WHITE}
                        size={30}
                    />
                </Pressable> */}
                
            </View>
            <ScrollView
                style={styles.wrapper}
            >

                <FlatList 
                    numColumns={4}
                    data={commonSection}
                    style={{marginBottom:10}}
                    ListHeaderComponent={
                        <Text style={[globalStyle.pageTitle, {marginVertical:0, paddingHorizontal:20, paddingTop:10, backgroundColor:colors.WHITE}]} >Delivery Status</Text>
                    }
                    renderItem={({item}) => 
                        <Pressable 
                            style={styles.commonSectionBtn} 
                            onPress={() => navigation.navigate("MyPercelHistory")}
                        >
                            {/* <FontAwesome5
                                color={item.color}
                                size={30}
                                name={item.icon}
                            /> */}
                            <Text style={{fontSize:50, color:item.color}} >{item.count}</Text>
                            <Text style={[globalStyle.regularText, {textTransform:'uppercase', color:item.color}]} >{item.name}</Text>
                        </Pressable>
                    }
                />

                <FlatList 
                    numColumns={4}
                    data={paymentSection}
                    ListHeaderComponent={
                        <Text style={[globalStyle.pageTitle, {marginVertical:0, paddingHorizontal:20, paddingTop:10, backgroundColor:colors.WHITE}]} >Payment Status</Text>
                    }
                    renderItem={({item}) => 
                        <Pressable style={styles.commonSectionBtn} >
                            {/* <FontAwesome5
                                color={item.color}
                                size={30}
                                name={item.icon}
                            /> */}
                            <Text style={{fontSize:50, color:item.color}} >{item.count}</Text>
                            <Text style={[globalStyle.regularText, globalStyle.textCenter, {textTransform:'uppercase', color:item.color}]} >{item.name}</Text>
                        </Pressable>
                    }
                />

                {/* <View style={[globalStyle.shadow, styles.myDas]} >
                    <Text style={globalStyle.label} >My Bkash</Text>
                    <FlatList 
                        horizontal={true}
                        data={commonSection}
                        renderItem={({item}) => 
                            <Pressable style={styles.myBkashBtn} >
                                <FontAwesome5
                                    color={item.color}
                                    size={30}
                                    name={item.icon}
                                />
                            <Text style={[globalStyle.regularText, globalStyle.textCenter, {textTransform:'uppercase', color:item.color}]} >{item.name}</Text>
                            </Pressable>
                        }
                    />
                </View> */}

                {/* <Carousel
                    // style={{marginTop:10}}
                    width={width}
                    height={width/2}
                    mode='parallax'
                    data={[1, 2, 3]}
                    autoPlay={true}
                    renderItem={({ item }) => 
                        <Image 
                            source={require('./../assets/images/offer.jpg')}
                            style={{
                                height:width/2,
                                width:width,
                            }}
                        />
                    }
                />

                <View style={[globalStyle.shadow, styles.myDas]} >
                    <Text style={globalStyle.label} >Seggesation</Text>
                    <FlatList 
                        horizontal={true}
                        data={commonSection}
                        renderItem={({item}) => 
                            <Pressable style={styles.myBkashBtn} >
                                <FontAwesome5
                                    color={item.color}
                                    size={30}
                                    name={item.icon}
                                />
                                <Text style={[globalStyle.textBold, {textTransform:'uppercase', fontSize:11, color:item.color}]} >{item.name}</Text>
                            </Pressable>
                        }
                    />
                </View> */}

                <View style={{height:100}} />
            </ScrollView>

        </InnerLayer>
    );
})

const styles = StyleSheet.create({
    wrapper:{
        // padding:25,
        backgroundColor:'#f5f5f5'
    },

    dashboardHead:{
        backgroundColor:colors.PRIMARY,
        height:100,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        paddingHorizontal:15
    },

    headMiddle:{
        flex:1,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center'
    },

    rightBtn:{
        marginLeft:10
    },

    bal:{
        paddingHorizontal:3,
        paddingVertical:3,
        borderRadius:20,
        backgroundColor:colors.WHITE,
        marginTop:5,
        maxWidth:150,
        flexDirection:'row'
    },

    balIcon:{
        alignItems:'center',
        justifyContent:'center',
        height:20,
        width:20,
        borderRadius:10,
        backgroundColor:colors.PRIMARY,
        marginRight:8
    },

    commonSectionBtn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:20,
        backgroundColor:colors.WHITE
    },

    myDas:{
        // minHeight:100,
        marginHorizontal:10,
        marginTop:10,
        padding:15,
        paddingVertical:15
    },

    myBkashBtn:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:15,
        backgroundColor:colors.WHITE,
        marginRight:10,
        minWidth:90
    }
})

export default Dashboard;