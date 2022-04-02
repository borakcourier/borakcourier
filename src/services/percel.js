import axios from "axios";
import { AppStore } from "../mobx/AppStore";
import { baseURL, Notify } from "../uti/utl";
import { AuthGet, AuthPost } from "./AllAPIs";


export async function AddNewPercel(data, AppStore){

    const res = await AuthPost("/courier/parcelInsert", data, AppStore)

    if(res){
        return res
    }

    return false
   
}

export async function MyPercelHistories(AppStore = AppStore){

    const data = await AuthPost("/courier/parcelList", {}, AppStore)

    if(data){
        return data
    }

    return []
}

export async function GetDistricts (AppStore){

    const data = await AuthGet("/masterData/district", AppStore)

    if(data){
        return data
    }

    return []

}


export async function GetPoliceSta (AppStore){

    const data = await AuthGet("/masterData/police_station", AppStore)

    if(data){
        return data
    }

    return []

}


export async function GetProTypes (AppStore){

    const data = await AuthGet("/masterData/product_type", AppStore)

    if(data){
        return data
    }

    return []

}

export async function GetProCats (AppStore){

    const data = await AuthGet("/masterData/product_category", AppStore)

    if(data){
        return data
    }

    return []

}

export async function GetPayTypes (AppStore){

    const data = await AuthGet("/masterData/payment_type", AppStore)

    if(data){
        return data
    }

    return []

}

export async function GetPercelForManager(AppStore, data){
    const res = await AuthPost('/courier/managerparcelList', data, AppStore);
    console.log("res", res)
    if(res){
        return res
    }
    return []
}