
import * as user from './user'
import * as percel from './percel'

import axios from "axios";
import { baseURL, Notify } from "../uti/utl";
import { AppStore } from '../mobx/AppStore';

export const AuthPost  = async (url, data, AppStore = AppStore) => {

    try{

        const res =  await axios.post(baseURL+url, data, {
            headers:{
                userName:AppStore.authInfo.phone,
                userPass:AppStore.authInfo.password
            }
        })

        // console.log(res)

        if(res.data.status){
            return res.data.data
        }else{
            Notify(res.data.message, 'error')
            return false
        }
    }catch(e){

        console.log(e)
        console.log(e.response)
        Notify('Something went wrong', 'error')
        return false

    }

}

export const AuthGet  = async (url, AppStore = AppStore) => {

    try{

        const res =  await axios.get(baseURL+url, {
            headers:{
                userName:AppStore.authInfo.phone,
                userPass:AppStore.authInfo.password
            }
        })

        console.log(res)

        if(res.data.status){
            return res.data.data
        }else{
            Notify(res.data.message, 'error')
            return false
        }

    }catch(e){

        console.log(e)
        console.log(e.response)
        Notify('Something went wrong', 'error')
        return false

    }
}

const AllAPIs = {
    user,
    percel,
    AuthGet,
    AuthPost
}

export default AllAPIs