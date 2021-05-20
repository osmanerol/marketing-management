import { makeAutoObservable, action } from 'mobx';
import { CustomerCreateDto, CustomerListDto } from '../dto/customerDto';
import { firestore } from '../../../service/firebaseConfig';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

const defaultCustomer : CustomerCreateDto = {
    id : null,
    firstname : '',
    lastname : '',
    phone : '',
    email : '',
    address : '',
    identity : ''
}

class CustomerStore {
    static readonly id : string = 'CustomerStore';
    customer!: CustomerCreateDto;
    customerList!: IPagedResult<CustomerListDto>;
    
    constructor(){
        makeAutoObservable(this);
        this.customer = defaultCustomer;
        this.customerList = { isLoading : false, result : [] };
        this.getAll = this.getAll.bind(this);
    }

    @action createCustomer() {
        this.customer = defaultCustomer;
    }

    @action async create() {
        let request = this.customer;
        delete request.id;
        await firestore.collection('customers').add(request);
        await this.getAll();
    }

    @action async getAll(startPage : number = 0) {
        this.customerList.isLoading = true;
        this.customerList.result = [];
        await firestore.collection('customers').orderBy('firstname').get().then((item : any) => {
            const list = item.docs.map((doc : any) => {
                let localDoc = { id : doc.id, ...doc.data()};
                return localDoc;
            })
            this.customerList.result = list;
        });
        this.customerList.isLoading = false;
    }

    @action async get(id : any) {
        await firestore.collection('customers').doc(id).get().then((item : any) => {
           this.customer = { id : id, ...item.data()};
        });
    }

    @action async delete(id : any) {
        await firestore.collection('customers').doc(id).delete().then(async (item : any) => {
            await this.getAll();
        });
    }

    @action async update(id : any) {
        this.customerList.isLoading = true;
        let request = this.customer;
        delete request.id;
        await firestore.collection('customers').doc(id).update(request).then((item : any) => {
            this.customerList.result = this.customerList.result.map((listItem : any) => {
                if(listItem.id === id){
                    this.customer.id = id;
                    listItem = this.customer;
                }
                return listItem;
            })
        });
        this.customerList.isLoading = false;
    }
}

export default new CustomerStore();