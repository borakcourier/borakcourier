import { action, makeObservable, observable } from "mobx";

class Store{

    language = "English";

    authInfo = {
        token:"",
        pass:"",
        phone:"",
        user:{
            
        }
    }

    appFor = "Donor"; // this is what type of user is going to use this app enum(Donor, Employee, Beneficiary)
    
    CD = {

        AA : 'SSSS',

        infoModalData : {
            title:'sdsd',
            body:''
        },
    }

    constructor(){
        makeObservable(this, {
            language: observable,
            UpdateLanguage: action,

            CD:observable,
            UpCD: action,

            authInfo:observable,
            UpdateauthInfo: action,

            ShowConfirm: action,
        })
    }

    UpdateLanguage(data){
        this.language = data
    }

    UpCD = (field, value) => {
        var upCD = this.CD
        upCD[field] = value
        this.CD = upCD
    }

    UpdateauthInfo(data){
        this.authInfo = data
    }

    ShowConfirm = (msg, cb) => {
        this.UpCD('confirm', {
            message:msg,
            callback:cb,
            title:"Are you sure",
        })
    }

}

export const AppStore = new Store()