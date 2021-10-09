import {observable,computed,action} from 'mobx';
import { getIsLogin,setIsLogin,setToken,getToken,setUserInfo ,getUserInfo} from './cookies'
class UserState {
    @observable count = 0;
    @observable name = 'Jokcy';
    @observable isLogin = getIsLogin();
    @observable vm = null;
    @observable token = getToken();
    @observable userInfo =getUserInfo();
    @computed get msg(){
        return `${this.name} say  count is ${this.count}`
    }
    @action add(){
        this.count +=1
    }
    @action changeUserMenu(data:any){

    }
    @action changeName(name:any){
        this.name =name
    }
    @action login(data:any){
        debugger
    }
    @action loginOut(data:any){
        debugger
    }
}

export default UserState
