import { makeAutoObservable, action } from 'mobx';
import { ProductCreateDto, ProductListDto } from '../dto/productDto';
import { firestore } from '../../../service/firebaseConfig';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

const defaultProduct: ProductCreateDto = {
    id : null,
    name : '',
    category : '',
    description : '',
    price : 0
}

class ProductStore {
    static readonly id : string = 'ProductStore';
    product!: ProductCreateDto;
    productList!: IPagedResult<ProductListDto>;
    
    constructor(){
        makeAutoObservable(this);
        this.product = defaultProduct;
        this.productList = { isLoading : false, result : [] };
        this.getAll = this.getAll.bind(this);
    }

    @action createproduct() {
        this.product = defaultProduct;
    }

    @action async create(categoryId : any) {
        let request = this.product;
        request.category = firestore.doc(`categories/${categoryId}`);
        delete request.id;
        await firestore.collection('products').add(request);
        await this.getAll();
    }

    @action async getAll(startPage : number = 0) {
        this.productList.isLoading = true;
        this.productList.result = [];
        await firestore.collection('products').orderBy('name').get().then(async (item : any) => {
            for(const doc of item.docs){
                let localDoc = { id : doc.id, ...doc.data() };
                await doc.data().category.get().then((snap : any) => {
                    localDoc['category'] = snap.data().name;
                })
                this.productList.result.push(localDoc);
            }
        });
        this.productList.isLoading = false;
    }

    @action async getProducts(){
        this.productList.isLoading = true;
        this.productList.result = [];
        await firestore.collection('products').orderBy('name').get().then(async (item : any) => {
            let list = item.docs.map((doc : any) => doc.data());
            this.productList.result = list;
        });
        this.productList.isLoading = false;
    }

    @action async get(id : any) {
        await firestore.collection('products').doc(id).get().then(async (item : any) => {
           let doc = { id : id, ...item.data()};
           await item.data().category.get().then((snap : any) => {
                doc['category'] = snap.data().name;
                this.product = doc;
           })
        });
    }

    @action async delete(id : any) {
        await firestore.collection('products').doc(id).delete().then(async (item : any) => {
            await this.getAll();
        });
    }

    @action async update(id : any, categoryId : any) {
        this.productList.isLoading = true;
        let request = Object.assign({ }, this.product)
        request.category = firestore.doc(`categories/${categoryId}`);
        delete request.id;
        await firestore.collection('products').doc(id).update(request).then(async (item : any) => {
            let index = 0;
            for(let doc of this.productList.result){
                if(doc.id === id){
                    await request.category.get().then((snap : any) => {
                        doc = this.product;
                        doc.category = snap.data().name;
                        this.productList.result[index] = doc;
                    })
                }
                index++;
            }
        });
        this.productList.isLoading = false;
    }
}

export default new ProductStore();