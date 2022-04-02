import { Platform, StyleSheet } from "react-native";
import { colors } from ".";

export function GetFont (language){

    if(language == 'Bangla'){
        return "Roboto"
    }

    if(language == 'English'){
        return "Roboto"
    }

    return "HindSiliguri"

}   
 

export const useGlobalStyle = (language = "Bangla") => {
    
    return StyleSheet.create({

        shadow:Platform.OS == 'android' ? {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            backgroundColor:'#fff'
            // marginBottom:100
        } : {
            shadowColor: '#aaa',
            shadowOpacity: 0.2,
            shadowRadius: 15,
    
            backgroundColor:'#fff',
            shadowOffset:{
                height:3,
                width:1
            }
            // marginBottom:100
        },
    
        greenShadow:{
            shadowColor: colors.PRIMARY,
            shadowOffset: {
                width: -2,
                height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
    
            elevation: 10,
            backgroundColor:colors.WHITE
        },
    
        rowBetween:{
            flexDirection:'row',
            alignItems:'center'
        },
    
        rowCenter:{
            flexDirection:'row',
            alignItems:'center'
        },
    
        rowCenterCenter:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
        },
    
        rowCenterBetween:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        },

        rowCenterAround:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
        },
    
        title:{
            fontSize:16,
            color:colors.FONT_COLOR,
            fontFamily:`${GetFont(language)}-Bold`
        },
    
        sectionHead:{
            fontSize:16,
            lineHeight:24,
            fontFamily:`${GetFont(language)}-Bold`,
            color:colors.FONT_COLOR,
            marginVertical:15
        },

        noHorizontalMargin:{
            marginRight:0,
            marginLeft:0
        },

        noVerticalMargin:{
            marginBottom:0,
            marginTop:0,
        },

        noMargin:{
            marginBottom:0,
            marginTop:0,
            marginRight:0,
            marginLeft:0
        },
    
        textCenter:{
            textAlign:'center'
        },
    
        grayText:{
            fontWeight:'600',
            fontFamily:`${GetFont(language)}-SemiBold`,
            fontSize:11,
            color:colors.FAQ_BODY
        },
    
        placeholder:{
            fontWeight:'600',
            fontFamily:`${GetFont(language)}-SemiBold`,
            fontSize:11,
            color:colors.PLACEHOLDER
        },
    
        regularText:{
            fontFamily:`${GetFont(language)}-Regular`,
            fontSize:10,
            color:colors.FAQ_BODY
        },
    
        textSm:{
            fontSize:11,
        },
    
        textMd:{
            fontSize:12,
        },
    
        regularColor:{
            color:colors.FAQ_BODY
        },
    
        input:{
            fontFamily:`${GetFont(language)}-SemiBold`,
            fontSize:11,
            color:colors.FONT_COLOR
        },
    
        label:{
            fontSize:12,
            fontFamily:`${GetFont(language)}-SemiBold`,
            color:colors.FONT_COLOR,

            fontWeight:'bold'
            
            // textTransform:'capitalize'
            // marginBottom:10
        },
    
        textDanger:{
            fontSize:11,
            fontFamily:`${GetFont(language)}-Medium`,
            color:colors.RED,
            marginTop:5
        },
    
        pageTitle:{
            fontFamily:`${GetFont(language)}-Regular`,
            fontSize:20,
            lineHeight:28,
            color:colors.FONT_COLOR,
            marginVertical:15
        },
    
        greenText:{
            fontFamily:`${GetFont(language)}-Medium`,
            fontSize:11,
            color:colors.PRIMARY
        },
    
        textWhite:{
            color:colors.WHITE
        },
    
        textSemiBold:{
            fontFamily:`${GetFont(language)}-SemiBold`
        },
    
        textBold:{
            fontFamily:`${GetFont(language)}-Bold`
        },
    
        textRegular:{
            fontFamily:`${GetFont(language)}-Regular`,
            color:colors.FAQ_BODY
        },
    
        textMedium:{
            fontFamily:`${GetFont(language)}-Medium`
        },
    
        card:{
            borderRadius:15,
            backgroundColor:colors.WHITE,
            padding:20,
            marginHorizontal:2,
    
            marginVertical:15
    
        }
    
    
    })
}
