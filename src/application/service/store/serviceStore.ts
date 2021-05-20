import { makeAutoObservable, action } from 'mobx';
import { ServiceCreateDto, ServiceListDto } from '../dto/serviceDto';
import { firestore } from '../../../service/firebaseConfig';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

const defaultService: ServiceCreateDto = {
    id : null,
    name : '',
    category : '',
    description : '',
    price : 0
}

class ServiceStore {
    static readonly id : string = 'ServiceStore';
    service!: ServiceCreateDto;
    serviceList!: IPagedResult<ServiceListDto>;
    
    constructor(){
        makeAutoObservable(this);
        this.service = defaultService;
        this.serviceList = { isLoading : false, result : [] };
        this.getAll = this.getAll.bind(this);
    }

    @action createService() {
        this.service = defaultService;
    }

    @action async create(categoryId : any) {
        let request = this.service;
        request.category = firestore.doc(`categories/${categoryId}`);
        delete request.id;
        await firestore.collection('services').add(request);
        await this.getAll();
    }

    @action async getAll(startPage : number = 0) {
        this.serviceList.isLoading = true;
        this.serviceList.result = [];
        await firestore.collection('services').orderBy('name').get().then(async (item : any) => {
            for(const doc of item.docs){
                let localDoc = { id : doc.id, ...doc.data() };
                await doc.data().category.get().then((snap : any) => {
                    localDoc['category'] = snap.data().name;
                })
                this.serviceList.result.push(localDoc);
            }
        });
        this.serviceList.isLoading = false;
    }

    @action async get(id : any) {
        await firestore.collection('services').doc(id).get().then(async (item : any) => {
           let doc = { id : id, ...item.data()};
           await item.data().category.get().then((snap : any) => {
                doc['category'] = snap.data().name;
                this.service = doc;
           })
        });
    }

    @action async delete(id : any) {
        await firestore.collection('services').doc(id).delete().then(async (item : any) => {
            await this.getAll();
        });
    }

    @action async update(id : any, categoryId : any) {
        this.serviceList.isLoading = true;
        let request = Object.assign({ }, this.service)
        request.category = firestore.doc(`categories/${categoryId}`);
        delete request.id;
        await firestore.collection('services').doc(id).update(request).then(async (item : any) => {
            let index = 0;
            for(let doc of this.serviceList.result){
                if(doc.id === id){
                    await request.category.get().then((snap : any) => {
                        doc = this.service;
                        doc.category = snap.data().name;
                        this.serviceList.result[index] = doc;
                    })
                }
                index++;
            }
        });
        this.serviceList.isLoading = false;
    }
}

export default new ServiceStore();