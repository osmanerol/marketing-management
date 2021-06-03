import { makeAutoObservable, action } from 'mobx';
import { SalesCreateDto, SalesListDto } from '../dto/salesDto';
import { firestore } from '../../../service/firebaseConfig';
import moment from 'moment';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

const defaultSale: SalesCreateDto = {
    id : 0,
    customerId : '',
    date : null,
    totalPrice : 0,
}

interface SaleItem {
    type : String,
    name : String,
    amount : number,
    price : number
}

const defaultProduct : SaleItem = {
    type : '1',
    name : '',
    amount : 0,
    price :0
}

const defaultService : SaleItem = {
    type : '2',
    name : '',
    amount : 0,
    price :0
}

class SalesStore {
    static readonly id : string = 'SalesStore';
    sale! : SalesCreateDto;
    salesList! : IPagedResult<SalesListDto>;
    saleDetailList! : IPagedResult<any>;
    product! : SaleItem;
    service! : SaleItem;
    selectedItemId : any;

    constructor(){
        makeAutoObservable(this);
        this.sale = defaultSale;
        this.salesList = { isLoading : false, result : []};
        this.saleDetailList = { isLoading : false, result : []};
        this.selectedItemId = 0;
        this.product = defaultProduct;
        this.service = defaultService;
        this.getAll = this.getAll.bind(this);
        this.getSale = this.getSale.bind(this);
    }

    @action async create() {
        let request = this.sale;
        request.totalPrice = request.totalPrice.toString();
        delete request.id;
        const result = await firestore.collection('sales').add(request);
        this.saleDetailList.result.map(async (item : any) => {
            item.price = item.price.toString();
            await firestore.collection('sales').doc(result.id).collection('saleItems').add(item);
        })
    }

    @action async createEmptySale() {
        this.sale = defaultSale;
    }

    @action async createEmptyProduct() {
        this.product = defaultProduct;
    }

    @action async createEmptyService() {
        this.service = defaultService;
    }

    @action async getAll() {
        this.salesList.isLoading = true;
        this.salesList.result = [];
        await firestore.collection('sales').orderBy('date').get().then((item : any) => {
            const list = item.docs.map((doc : any) => {
                let localDoc = { id : doc.id, ...doc.data(), date : moment(doc.data().date.seconds * 1000).format('LLL')};
                return localDoc;
            })
            this.salesList.result = list;
        });
        this.salesList.isLoading = false;
    }

    @action async getSale() {
        if(this.selectedItemId !== 0 && this.selectedItemId !== 1){
            this.saleDetailList.isLoading = true;
            this.saleDetailList.result = [];
            await firestore.collection('sales').doc(this.selectedItemId).collection('saleItems').get().then((item : any) => {
                const list = item.docs.map((doc : any) => doc.data() )
                this.saleDetailList.result = list;
            });
            this.saleDetailList.isLoading = false;
        }
    }

    @action async addSaleItemList(){
        if(this.product.name !== ''){
            this.saleDetailList.result = [...this.saleDetailList.result, this.product];
            this.sale.totalPrice += this.product.price;
        }
        if(this.service.name !== ''){
            this.saleDetailList.result = [...this.saleDetailList.result, this.service];
            this.sale.totalPrice += this.service.price;
        }
    }

}

export default new SalesStore();