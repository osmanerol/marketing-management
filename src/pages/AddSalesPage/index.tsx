import React, { FC , useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import { useHistory } from 'react-router-dom';
import ProductModal from './productAddModal';
import ServiceModal from './serviceAddModal';
import CompleteModal from './completeModal';
import SalesStore from '../../application/sales/store/salesStore';

interface IDefaultProps {
    SalesStore? : typeof SalesStore,
}

const Index : FC<IDefaultProps> = inject('SalesStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store } = props;
    const history = useHistory();
    const [showProductModal, setShowProductModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const headers = [ { name : 'Tip', accessor : 'type'}, { name : 'Ad', accessor : 'name'}, { name : 'Adet', accessor : 'amount'}, { name : 'Fiyat', accessor : 'price'} ];

    const handleProductModalOpen = () => {
        setShowProductModal(true);
    }

    const handleProductModalClose = () => {
        setShowProductModal(false);
    }

    const handleServiceModalOpen = () => {
        setShowServiceModal(true);
    }

    const handleServiceModalClose = () => {
        setShowServiceModal(false);
    }

    const handleCompleteModalOpen = () => {
        setShowCompleteModal(true);
    }

    const handleCompleteModalClose = () => {
        setShowCompleteModal(false);
    }

    useEffect(() => {
        if(store!.selectedItemId === 0){
            history.push('/panel/sales')
        }
        if(store!.selectedItemId === 1){
            store!.saleDetailList = { isLoading : false, result : [] };
        }
        store!.createEmptySale();
    }, [])

    return (
        <>
            <div className='page-container'>
                <header>
                    <h3 className='title'>{ store!.selectedItemId !== 1 ? 'Satış Geçmişi' : 'Yeni Satış'}</h3>
                    <div className='button-container'>
                        {
                            store!.selectedItemId === 1 && 
                            <>
                                <Button text='Ürün ekle' size='sm' className='button' onClick={handleProductModalOpen} />
                                <Button text='Hizmet ekle' size='sm' className='button' onClick={handleServiceModalOpen} />
                            </>
                        }
                    </div>
                </header>
                <main>
                    <Table headers={headers} items={store!.saleDetailList.result} isLoading={store!.saleDetailList.isLoading} fetchData={store!.getSale} />
                    {
                        store!.selectedItemId === 1 &&
                        <Button text='Satış Tamamla' size='sm' className='button mt-2 d-flex justify-content-end' onClick={handleCompleteModalOpen} />
                    }
                </main>
            </div>
            { showProductModal && <ProductModal show={showProductModal} handleClose={handleProductModalClose} /> }
            { showServiceModal && <ServiceModal show={showServiceModal} handleClose={handleServiceModalClose} /> }
            { showCompleteModal && <CompleteModal show={showCompleteModal} handleClose={handleCompleteModalClose} /> }
        </>
    );
}));

export default Index;