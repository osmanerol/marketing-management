import React, { FC , useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import Edit from './edit';
import VisitStore from '../../application/visit/store/visitStore';

interface IDefaultProps {
    VisitStore? : typeof VisitStore
}

const Index : FC<IDefaultProps> = inject('VisitStore')(observer((props : IDefaultProps) => {
    const { VisitStore : store } = props;
    const [showModal, setShowModal] = useState(false);
    const headers = [ { name : 'Müşteri', accessor : 'customer'}, { name : 'Ürün/Hizmet', accessor : 'name'}, { name : 'Tarih', accessor : 'date'}];

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='page-container'>
                <header>
                    <h3 className='title'>Ziyaretler</h3>
                    <Button text='Ziyaret ekle' size='sm' className='button' onClick={handleOpenModal} />
                </header>
                <main>
                    <Table headers={headers} items={store!.visitList.result} isLoading={store!.visitList.isLoading} fetchData={store!.getAll} />
                </main>
            </div>
            { showModal && <Edit show={showModal} handleClose={handleCloseModal} /> }
        </>
    );
}));

export default Index;