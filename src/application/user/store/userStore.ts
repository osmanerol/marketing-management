import { makeAutoObservable, action} from 'mobx';
import { UserCreateDto } from '../dto/userDto';

const defaultUser = {
    email : '',
    password : ''
}

class UserStore {
    static readonly id : string = 'UserStore';
    user!: UserCreateDto;

    constructor(){
        makeAutoObservable(this);
        this.user = defaultUser;
    }

    @action createUser() {
        this.user = defaultUser;
    }

    @action async login() {

    }

    @action async signup() {
        
    }
}

export default new UserStore();