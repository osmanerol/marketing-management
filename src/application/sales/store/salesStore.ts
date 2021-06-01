import { makeAutoObservable, action } from 'mobx';
import { SalesCreateDto, SalesListDto } from '../dto/salesDto';
import { firestore } from '../../../service/firebaseConfig';
import moment from 'moment';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

const defaultSales: SalesCreateDto = {
    id : 0,
    date : null,
    totalPrice : 0,
    saleItems: []
}

class SalesStore {
    static readonly id : string = 'SalesStore';
    salesList! : IPagedResult<SalesListDto>;
    salesItemList : any;
    selectedItemId : any;

    constructor(){
        makeAutoObservable(this);
        this.salesList = { isLoading : false, result : []};
        this.salesItemList = [];
        this.selectedItemId = 0;
        this.getAll = this.getAll.bind(this);
        this.getSale = this.getSale.bind(this);
    }

    @action createproduct() {
    }

    @action async create(categoryId : any) {
    }

    @action async getAll(startPage : number = 0) {
        this.salesList.isLoading = true;
        this.salesList.result = [];
        await firestore.collection('sales').get().then((item : any) => {
            const list = item.docs.map((doc : any) => {
                let localDoc = { id : doc.id, ...doc.data(), date : moment(doc.data().date.seconds * 1000).format('LLL')};
                return localDoc;
            })
            this.salesList.result = list;
        });
        this.salesList.isLoading = false;
    }

    @action async getSale() {
        this.salesList.isLoading = true;
        this.salesList.result = [];
        await firestore.collection('sales').get().then((item : any) => {
            const list = item.docs.map((doc : any) => {
                firestore.collection('sales').doc(this.selectedItemId).collection('saleitems').get().then((docItem : any) => {
                    docItem.docs.map((docInstance : any) => {
                        console.log(docInstance.data())
                    })
                })
                let localDoc = { id : doc.id, ...doc.data(), date : moment(doc.data().date.seconds * 1000).format('LLL')};
                return localDoc;
            })
            this.salesList.result = list;
        });
        this.salesList.isLoading = false;
    }

    @action async get(id : any) {
    }

    @action async delete(id : any) {
    }

    @action async update(id : any, categoryId : any) {
    }
}

export default new SalesStore();