import { configure, makeAutoObservable, action } from 'mobx';
import { CategoryCreateDto, CategoryListDto } from '../dto/categoryDto';
import { firestore } from '../../../service/firebaseConfig';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

configure({
    enforceActions: "never",
})

const defaultCategory : CategoryCreateDto = {
    id : null,
    name : ''
}

class CategoryStore {
    static readonly id : string = 'CategoryStore';
    category!: CategoryCreateDto;
    categoryList!: IPagedResult<CategoryListDto>;
    
    constructor(){
        makeAutoObservable(this);
        this.category = defaultCategory;
        this.categoryList = { result : [], isLoading : false };
        this.getAll = this.getAll.bind(this);
    }

    @action createCategory() {
        this.category = defaultCategory;
    }

    @action async create() {
        let request = this.category;
        delete request.id;
        await firestore.collection('categories').add(request);
        await this.getAll();
    }

    @action async getAll(startPage : number = 0) {
        this.categoryList.isLoading = true;
        this.categoryList.result = [];
        await firestore.collection('categories').orderBy('name').get().then((item : any) => {
            const list = item.docs.map((doc : any) => {
                let localDoc = { id : doc.id, ...doc.data()};
                return localDoc;
            })
            this.categoryList.result = list;
        });
        this.categoryList.isLoading = false;
    }

    @action async get(id : any) {
        await firestore.collection('categories').doc(id).get().then((item : any) => {
           this.category = { id : id, ...item.data()};
        });
    }

    @action async delete(id : any) {
        await firestore.collection('categories').doc(id).delete().then(async (item : any) => {
            await this.getAll();
        });
    }

    @action async update(id : any) {
        this.categoryList.isLoading = true;
        let request = this.category;
        delete request.id;
        await firestore.collection('categories').doc(id).update(request).then((item : any) => {
            this.categoryList.result = this.categoryList.result.map((listItem : any) => {
                if(listItem.id === id){
                    this.category.id = id;
                    listItem = this.category;
                }
                return listItem;
            })
        });
        this.categoryList.isLoading = false;
    }
}

export default new CategoryStore();