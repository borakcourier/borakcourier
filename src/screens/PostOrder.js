// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../mobx/AppStore';
import { FullButton, InnerLayer, LabeledShadowInput } from '../components';
import { useGlobalStyle } from '../styles/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import AllAPIs from '../services/AllAPIs';
import { ActionSheet , Modal, ListItem, Text as UiLabText} from 'react-native-ui-lib';
import { Validate } from '../uti/validation';
import moment from 'moment';
import { Notify } from '../uti/utl';

let scrollPosition = {}

const PostOrder = observer(({navigation, route}) => {
    
    const globalStyle = useGlobalStyle(AppStore.language) 
    
    const formScroll = React.useRef()

    const [date, setDate] = React.useState(new Date(1598051730000));
    const [mode, setMode] = React.useState('date');
    const [dateShowFor, setdateShowFor] = React.useState('');
    const [show, setShow] = React.useState(false);

    const [validation, Setvalidation] = React.useState({})

    const [showdistricts, Setshowdistricts] = React.useState(false)
    const [showdistrictsforDel, SetshowdistrictsforDel] = React.useState(false)
    const [districts, Setdistricts] = React.useState([])
    const [showproTypes, SetshowproTypes] = React.useState(false)
    const [proTypes, SetproTypes] = React.useState([])
    const [showproCats, SetshowproCats] = React.useState(false)
    const [proCats, SetproCats] = React.useState([])
    const [showpayTypes, SetshowpayTypes] = React.useState(false)
    const [payTypes, SetpayTypes] = React.useState([])
    const [showpoliceSta, SetshowpoliceSta] = React.useState(false)
    const [showpoliceStaforDel, SetshowpoliceStaforDel] = React.useState(false)
    const [policeSta, SetpoliceSta] = React.useState([])

    React.useEffect(() => {
        LoadEssData()
    }, [])

    const LoadEssData = async () => {
        Setdistricts(await AllAPIs.percel.GetDistricts(AppStore))
        SetpoliceSta(await AllAPIs.percel.GetPoliceSta(AppStore))
        SetproCats(await AllAPIs.percel.GetProCats(AppStore))
        SetproTypes(await AllAPIs.percel.GetProTypes(AppStore))
        SetpayTypes(await AllAPIs.percel.GetPayTypes(AppStore))
    }

//     {"supplierID": "1",
// "pickupDistrict": "1",
// "pickupPiliceStation": "1",
// "pickupAddress": "asdf",
// "customerName": "name",
// "customerContact": "1234",
// "customerDistrict": "1",
// "customerPiliceStation": "1",
// "customerAddress": "qq",
// "pickupDate": "18-01-2022",
// "pickupTime": "10:50",
// "deliveryDate": "18-01-2022",
// "deliveryTime": "10:50",
// "productCategory": "1",
// "productType": "1",
// "product": "asd",
// "productWeight": "12",
// "productPrice": "122",
// "deliveryCharge": "22",
// "customerPaymentType": "1",
// "USER_ID": "183",
// "orgID": "1"}

    const [submitData, SetsubmitData] = React.useState({
        "supplierID": "1",
        "pickupDistrict": "",
        "pickupPiliceStation": "",
        "pickupAddress": "",
        "customerName": "",
        "customerContact": "",
        "customerDistrict": "",
        "customerPiliceStation": "",
        "customerAddress": "",
        "pickupDate": moment().format("DD-MM-YYYY"),
        "pickupTime": moment().format("hh:mm A"),
        "deliveryDate": moment().format("DD-MM-YYYY"),
        "deliveryTime": moment().format("hh:mm A"),
        "productCategory": "",
        "productType": "",
        "product": "",
        "productWeight": "",
        "productPrice": "",
        "deliveryCharge": 0,
        "customerPaymentType": "",
        "USER_ID": AppStore.authInfo.user.USER_ID,
        "orgID": "1",
        "comments":".."
    })

    const UpdatesubmitData = (data) => {
        SetsubmitData({...submitData, ...data})
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        // setDate(currentDate);
        // alert(currentDate)

        if(dateShowFor == 'pickup'){
            if(mode == 'date'){
                UpdatesubmitData({pickupDate:moment(currentDate).format("DD-MM-YYYY")})
            }else{
                UpdatesubmitData({pickupTime:moment(currentDate).format("hh:mm A")})
            }
            
        }else{
            if(mode == 'date'){
                UpdatesubmitData({deliveryDate:moment(currentDate).format("DD-MM-YYYY")})
            }else{
                UpdatesubmitData({deliveryTime:moment(currentDate).format("hh:mm A")})
            }
        }
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      }

    const Submit = async () => {

        console.log(submitData)

        if(!submitData.pickupDistrict){
            Notify("Please select  pickup district", "error")
            return null
        }

        if(!submitData.pickupPiliceStation){
            Notify("Please select  pickup police station", "error")
            return null
        }

        if(!submitData.productWeight){
            Notify("Please add product weight", "error")
            return null
        }

        if(!submitData.productCategory){
            Notify("Please select product category", "error")
            return null
        }

        if(!submitData.productPrice){
            Notify("Please add product price", "error")
            return null
        }

        if(!submitData.product){
            Notify("Please add product name", "error")
            return null
        }

        if(!submitData.customerPaymentType){
            Notify("Please select payment type", "error")
            return null
        }

        if(!submitData.customerAddress){
            Notify("Please add customer address", "error")
            return null
        }

        if(!submitData.customerName){
            Notify("Please add customer name", "error")
            return null
        }

        if(!submitData.customerContact){
            Notify("Please add customer phone", "error")
            return null
        }

        if(!submitData.pickupAddress){
            Notify("Please add pockup address", "error")
            return null
        }

        if(!submitData.customerDistrict){
            Notify("Please select delivery district", "error")
            return null
        }

        if(!submitData.customerPiliceStation){
            Notify("Please select delivery polic station", "error")
            return null
        }
        

        const res = await AllAPIs.percel.AddNewPercel(submitData, AppStore)

        if(res){
            navigation.push('MyPercelHistory')
        }

        console.log(res)

        const validationData = [

        ]

        Validate(validationData, submitData, formScroll, Setvalidation, async () => {

        })
    }

    React.useEffect(() => {
        calculateDC()
    }, [submitData.productCategory, submitData.productWeight])

    const calculateDC = () => {
        const weight = parseFloat(submitData.productWeight)
        if(!isNaN(weight) && submitData.productCategory){
            let price = proCats.find(ele => ele.id  == submitData.productCategory)?.price
            if(weight <= 1){
                UpdatesubmitData({deliveryCharge:price})
            }else{
                UpdatesubmitData({deliveryCharge:price + (Math.ceil(weight - 1) * 20)})
            }
        }
    }

      console.log(submitData.deliveryCharge)

    return (
        <InnerLayer 
            hideFooter
        >
            <ScrollView 
                style={styles.wrapper}
                ref={formScroll}
            >
                <Text style={globalStyle.pageTitle} >Pickup Information</Text>

                <LabeledShadowInput 
                    label="Contct Person Name"
                    placeholder="Name"
                    // value={submitData.customerName}
                    // onChangeText={text => UpdatesubmitData({customerName:text})}
                    // error={validation.customerName}
                    // onLayout={event => scrollPosition.phone = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="Contct No"
                    placeholder="Phone Number"
                    // value={submitData.customerContact}
                    // onChangeText={text => UpdatesubmitData({customerContact:text})}
                    // error={validation.customerContact}
                    // onLayout={event => scrollPosition.customerContact = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="District"
                    placeholder="Select District"
                    value={districts.find(ele => ele.id == submitData.pickupDistrict)?.district_name || ""}
                    mode="picker"
                    onPress={() => Setshowdistricts(true)}
                />

                {submitData.pickupDistrict ?
                    <LabeledShadowInput 
                        label="Police Station"
                        placeholder="Select Police Station"
                        value={policeSta.find(ele => ele.id == submitData.pickupPiliceStation) ? policeSta.find(ele => ele.id == submitData.pickupPiliceStation).police_station_name : ""}
                        mode="picker"
                        onPress={() => SetshowpoliceSta(true)}
                    />
                : null }

                <LabeledShadowInput 
                    label="Pickup Address"
                    placeholder="Pick up Address"
                    onChangeText={text => UpdatesubmitData({pickupAddress:text})}
                    error={validation.pickupAddress}
                    onLayout={event => scrollPosition.pickupAddress = event.nativeEvent.layout.y}
                    multiline={true}
                    numberOfLine={5}
                />

                <LabeledShadowInput 
                    label="Pickup Date"
                    value={submitData.pickupDate}
                    mode="picker"
                    onPress={() => {
                        showMode('date');
                        setdateShowFor('pickup')
                    }}
                />

                <LabeledShadowInput 
                    label="Pickup Time"
                    value={submitData.pickupTime}
                    mode="picker"
                    onPress={() => {
                        showMode('time')
                        setdateShowFor('pickup')
                    }}
                />

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Text style={globalStyle.pageTitle} >Delivery Information</Text>

                <LabeledShadowInput 
                    label="Contct Person Name"
                    placeholder="Name"
                    value={submitData.customerName}
                    error={validation.customerName}
                    onChangeText={text => UpdatesubmitData({customerName:text})}
                    onLayout={event => scrollPosition.phone = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="Contct No"
                    placeholder="Phone Number"
                    error={validation.customerContact}
                    value={submitData.customerContact}
                    onChangeText={text => UpdatesubmitData({customerContact:text})}
                    onLayout={event => scrollPosition.customerContact = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="Delivery District"
                    placeholder="Select Delivery District"
                    value={districts.find(ele => ele.id == submitData.customerDistrict)?.district_name || ""}
                    mode="picker"
                    onPress={() => SetshowdistrictsforDel(true)}
                    onLayout={event => scrollPosition.customerDistrict = event.nativeEvent.layout.y}
                />

                {submitData.customerDistrict ?
                    <LabeledShadowInput 
                        label="Police Delivery Station"
                        placeholder="Select Police Delivery Station"
                        value={policeSta.find(ele => ele.id == submitData.customerPiliceStation) ? policeSta.find(ele => ele.id == submitData.customerPiliceStation).police_station_name : ""}
                        mode="picker"
                        onPress={() => SetshowpoliceStaforDel(true)}
                        onLayout={event => scrollPosition.customerPiliceStation = event.nativeEvent.layout.y}
                    />
                : null }

                <LabeledShadowInput 
                    label="Delivery Address"
                    placeholder="Type Delivery Address"
                    value={submitData.customerAddress}
                    onChangeText={text => UpdatesubmitData({customerAddress:text})}
                    onLayout={event => scrollPosition.customerAddress = event.nativeEvent.layout.y}
                    multiline={true}
                    numberOfLine={5}
                />

                <LabeledShadowInput 
                    label="Delivery Date"
                    value={submitData.deliveryDate}
                    onPress={() => {
                        showMode('date');
                        setdateShowFor('delivery')
                    }}
                    mode="picker"

                />

                <LabeledShadowInput 
                    label="Delivery Time"
                    value={submitData.deliveryTime}
                    onPress={() => {
                        showMode('time');
                        setdateShowFor('delivery')
                    }}
                    mode="picker"

                />

                <Text style={globalStyle.pageTitle} >Parcel Information</Text>

                <LabeledShadowInput 
                    label="Product Category"
                    placeholder="Select"
                    value={proCats.find(ele => ele.id == submitData.productCategory)?.category_name || ""}
                    mode="picker"
                    onPress={() => SetshowproCats(true)}
                />

                <LabeledShadowInput 
                    label="Product Type"
                    placeholder="Select One"
                    value={proTypes.find(ele => ele.id == submitData.productType)?.type_name || ""}
                    mode="picker"
                    onPress={() => SetshowproTypes(true)}
                />

                <LabeledShadowInput 
                    label="Product"
                    placeholder="product"
                    value={submitData.product}
                    onChangeText={text => UpdatesubmitData({product:text})}
                    onLayout={event => scrollPosition.product = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="Product Total Price"
                    placeholder=""
                    value={submitData.productPrice}
                    onChangeText={text => UpdatesubmitData({productPrice:text})}
                    onLayout={event => scrollPosition.productPrice = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="Product wight"
                    placeholder="Product wight"
                    value={submitData.productWeight}
                    onChangeText={text => UpdatesubmitData({productWeight:text})}
                    onLayout={event => scrollPosition.productWeight = event.nativeEvent.layout.y}
                />

                <LabeledShadowInput 
                    label="Delivery Charge"
                    value={submitData.deliveryCharge.toString()}
                    editable={false}
                />

                <LabeledShadowInput 
                    label="Customer Payement type"
                    placeholder="Select"
                    mode='picker'
                    value={payTypes.find(ele => ele.id == submitData.customerPaymentType)?.payment_type || ""}
                    onPress={() => SetshowpayTypes(true)}
                />

                {/* <LabeledShadowInput 
                    label="Special Notes"
                    placeholder="Cash on Delivery"  
                /> */}



                <View style={{height:100}} />

            </ScrollView>

            <FullButton 
                title="Submit"
                style={{margin:25}}
                onPress={Submit}
            />

        <ActionSheet
            title={'Select District'}
            options={districts.map(ele => {
                return {label:ele.district_name, onPress:() => UpdatesubmitData({pickupDistrict:ele.id})}
            })}
            visible={showdistricts}
            onDismiss={() => Setshowdistricts(false)}
        />

        

        <ActionSheet
            title={'Select Product Category'}
            options={proCats.map(ele => {
                return {label:ele.category_name, onPress:() => UpdatesubmitData({productCategory:ele.id})}
            })}
            visible={showproCats}
            onDismiss={() => SetshowproCats(false)}
        />

        <ActionSheet
            title={'Select Product Type'}
            options={proTypes.map(ele => {
                return {label:ele.type_name, onPress:() => UpdatesubmitData({productType:ele.id})}
            })}
            visible={showproTypes}
            onDismiss={() => SetshowproTypes(false)}
        />

        <ActionSheet
            title={'Select Payment Type'}
            options={payTypes.map(ele => {
                return {label:ele.payment_type, onPress:() => UpdatesubmitData({customerPaymentType:ele.id})}
            })}
            visible={showpayTypes}
            onDismiss={() => SetshowpayTypes(false)}
        />

        <ActionSheet
            title={'Select Delivery District'}
            options={districts.map(ele => {
                return {label:ele.district_name, onPress:() => UpdatesubmitData({customerDistrict:ele.id})}
            })}
            visible={showdistrictsforDel}
            onDismiss={() => SetshowdistrictsforDel(false)}
        />

        {/* <ActionSheet
            title={'Select Delivery Police Station'}
            options={policeSta.filter(ele => ele.district_id == submitData.customerDistrict).map(ele => {
                return {label:ele.police_station_name, onPress:() => UpdatesubmitData({customerPiliceStation:ele.id})}
            })}
            visible={showpoliceStaforDel}
            onDismiss={() => SetshowpoliceStaforDel(false)}
        /> */}

        <Modal 
            visible={showpoliceStaforDel} 
            onBackgroundPress={() => SetshowpoliceStaforDel(false)}
        >
            <ScrollView>
                {policeSta.filter(ele => ele.district_id == submitData.customerDistrict).map((ele, index) =>
                    <ListItem 
                        key={index}
                        onPress={() => {
                            UpdatesubmitData({customerPiliceStation:ele.id})
                            SetshowpoliceStaforDel(false)
                        }}
                    >
                        <UiLabText grey10 text60 marginL-10>{ele.police_station_name}</UiLabText>
                    </ListItem>
                )}
            </ScrollView>
            
        </Modal>

        {/* <ActionSheet
            title={'Select Police Station'}
            options={policeSta.filter(ele => ele.district_id == submitData.pickupDistrict).map(ele => {
                return {label:ele.police_station_name, onPress:() => UpdatesubmitData({pickupPiliceStation:ele.id})}
            })}
            visible={showpoliceSta}
            onDismiss={() => SetshowpoliceSta(false)}
        /> */}

        <Modal 
            visible={showpoliceSta} 
            onRequestClose={() => SetshowpoliceSta(false)}
        >
            <ScrollView>
                {policeSta.filter(ele => ele.district_id == submitData.pickupDistrict).map((ele, index) =>
                    <ListItem 
                        key={index}
                        onPress={() => {
                            UpdatesubmitData({pickupPiliceStation:ele.id})
                            SetshowpoliceSta(false)
                        }}
                    >
                        <UiLabText grey10 text60 marginL-10>{ele.police_station_name}</UiLabText>
                    </ListItem>
                )}
            </ScrollView>
            
        </Modal>

        </InnerLayer>
    );
})

const styles = StyleSheet.create({
    wrapper:{
        padding:25
    }
})

export default PostOrder;