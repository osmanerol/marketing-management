import { makeAutoObservable, action} from 'mobx';
import { VisitCreateDto, VisitListDto } from '../dto/visitDto';
import { firestore } from '../../../service/firebaseConfig';
import moment from 'moment';
import IPagedResult from '../../../model/dto/fetch/IPagedResult';

const defaultVisit = {
    customer : '',
    name : '',
    date : null
}

class VisitStore {
    static readonly id : string = 'VisitStore';
    visitList! : IPagedResult<VisitListDto>
    visit!: VisitCreateDto;
    error! : any;

    constructor(){
        makeAutoObservable(this);
        this.visitList = { isLoading : false, result : [] };
        this.visit = defaultVisit;
        this.error = null;
        this.getAll = this.getAll.bind(this);
    }

    @action createVisit() {
        this.visit = defaultVisit;
    }

    @action async getAll() {
        this.visitList.isLoading = true;
        this.visitList.result = [];
        await firestore.collection('visits').orderBy('date').get().then((item : any) => {
            const list = item.docs.map((doc : any) => {
                let localDoc = doc.data();
                localDoc.date = moment(localDoc.date.seconds * 1000).format('LLL');
                return localDoc;
            })
            this.visitList.result = list;
        });
        this.visitList.isLoading = false;
    }

    @action async create() {
        this.visit.date = new Date();
        await firestore.collection('visits').add(this.visit);
        await this.getAll();
    }

}

export default new VisitStore();