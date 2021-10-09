import {observable,computed,action} from 'mobx';
class MenuState {
    @observable count = 0;
    @observable name = 'Jokcy';
    @observable isLogin = false;
    @observable vm = null;
    @computed get msg(){
        return `${this.name} say  count is ${this.count}`
    }
    @action add(){
        this.count +=1
    }
}

export default MenuState
