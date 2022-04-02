import PhoneInput, { isValidNumber, getCountryCode } from "react-native-phone-number-input";
import { camelToNormal } from "./utl";

export function IsEmail(string){

    if (string.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return (true)
    }

    return false

}

export function IsPhone(string){

   if(isValidNumber(string))
    {
        return true;
    }
    else
    {
        return false;
    }

}

export function CheckPassword(string){

    // if (string.match(/^(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])$/)){
    //     return (true)
    // }
    let errors = [];
    // if (string.length < 6) {
    //     errors.push("Your password must be at least 8 characters"); 
    // }
    // if (string.search(/[a-z]/) < 0) {
    //     errors.push("Your password must contain at least one lower case.");
    // }
    // if (string.search(/[A-Z]/) < 0) {
    //     errors.push("Your password must contain at least one upper case.");
    // }
    // if (string.search(/[0-9]/) < 0) {
    //     errors.push("Your password must contain at least one digit."); 
    // }
    if (errors.length > 0) {
        return false;
    }
        
    return true;
}

export function CheckPhoneCountry(string){

    if(string.substring(0, 4) == '+880'){
        return true
    }
    return false

}

export function checkMatchingField(){

}

export function SingleValidation(){
  
} 

export function Validate(validationData, data, formScroll, Setvalidation, onSuccess, onError ){

    let errors = {};

    let scrolled = false

    function setError(element, message){

        errors[element.key] = message

        if(!scrolled){

            scrolled = true

            formScroll ? formScroll.current.scrollTo({ animated: true, y: element.scrollPosition }) : null

        }
    }

    for (let index = 0; index < validationData.length; index++) {

        const element = validationData[index];  

        const value = data[element.key];

        if(element.required && !value){

            setError(element, `${camelToNormal(element.key)} required`)

        }

        if(element.type == 'email' && !IsEmail(value)){

            setError(element, `Invalid email`)

        }

        if(element.type == 'phone' && !IsPhone(value)){

            if(!IsPhone(value)){
                setError(element, `Invalid phone number`)
            }
            
            if(value && !CheckPhoneCountry(value)){
                setError(element, `Only avaliable in Bangladesh`)
            }

        }

        if(element.type == 'password' && !CheckPassword(value)){
            setError(element, `Password must contain at least 8 characters with one number, one lower case and one upper case`)
        }

        // if(element.matchingField){
        //     setError(element, `Didn't match with ${camelToNormal(element.matchingField)}`)
        // }

        

    }

    Setvalidation ? Setvalidation(errors) : null

    if(Object.keys(errors).length == 0){
           
      onSuccess ? onSuccess() : null

      return true

    }else{

      onError ? onError(errors) : null

      return false


    }

} 


