import UserState from './user'
import MenuState from './menu'
let userState:any = new UserState();
let menuState:any = new MenuState();
const stores = {
    userState,
    menuState
};

export default stores;
