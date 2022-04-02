import axios from "axios";
import { AppStore } from "../mobx/AppStore";
import { baseURL, Notify } from "../uti/utl";
import { AuthGet } from "./AllAPIs";


export async function Login(data){
    console.log(data)
    try{

        const res =  await axios.post(baseURL+"/authentication/login", {
            userName:data.phone,
            userPass:data.password
        })

        console.log(res)

        if(res.data.status){
            return res.data.data
        }else{
            Notify(res.data.message, 'error')
            return false
        }
    }catch(e){
        // console.log(e)
        console.log(e.response.data.errors)
        Notify('Something went wrong', 'error')
        return false
    }
   
}

export async function Signup(data){
    try{
        const res =  await axios.post(baseURL+"/authentication/signup", {
            "fullName":data.fullName,
            "userPass":data.password,
            "phone":data.phone,
            "email":data.email
        })

        console.log(res)

        if(res.data.status){
            return true
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

export async function dashboardStat(AppStore){
    return await AuthGet('/dashboard/merchantStatus', AppStore)
}