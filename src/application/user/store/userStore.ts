import { makeAutoObservable, action} from 'mobx';
import { UserCreateDto } from '../dto/userDto';
import { firebase } from '../../../service/firebaseConfig';

const defaultUser = {
    email : '',
    password : ''
}

class UserStore {
    static readonly id : string = 'UserStore';
    user!: UserCreateDto;
    error! : any;

    constructor(){
        makeAutoObservable(this);
        this.user = defaultUser;
        this.error = null;
    }

    @action createUser() {
        this.user = defaultUser;
    }

    @action async login() {
        await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then((response : any) => {
            localStorage.setItem('logged-in', "true");
            this.error = null;
        }).catch((error : any) => {
            this.error = error;
        });
    }

    @action async signup() {
        await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((response : any) => {
            this.error = null;
        }).catch((error : any) => {
            console.log(error)
            this.error = error;
        });
    }
}

export default new UserStore();