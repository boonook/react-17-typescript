import UserState from './user'
import MenuState from './menu'
let userState = new UserState();
let menuState = new MenuState();
const stores = {
    userState,
    menuState
};

export default stores;
