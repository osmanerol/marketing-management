import React, { FC , useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import { useHistory } from 'react-router-dom';
import ProductModal from './productAddModal';
import ServiceModal from './serviceAddModal';
import SalesStore from '../../application/sales/store/salesStore';

interface IDefaultProps {
    SalesStore? : typeof SalesStore,
}

const Index : FC<IDefaultProps> = inject('SalesStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store } = props;
    const history = useHistory();
    const [showProductModal, setShowProductModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [id, setId] = useState<any>(null);
    const headers = [ { name : 'Ad', accessor : 'name'}, { name : 'Adet', accessor : 'amount'}, { name : 'Toplam HizmetFiyat', accessor : 'price'} ];

    const handleProductModalOpen = () => {
        setId(0);
        setShowProductModal(true);
    }

    const handleProductModalClose = () => {
        setShowProductModal(false);
    }

    const handleServiceModalOpen = () => {
        setId(0);
        setShowServiceModal(true);
    }

    const handleServiceModalClose = () => {
        setShowServiceModal(false);
    }

    useEffect(() => {
        if(store!.selectedItemId === 0){
            history.push('/panel/sales')
        }
    }, [])

    return (
        <>
            <div className='page-container'>
                <header>
                    <h3 className='title'>Yeni Satış</h3>
                    <div className='button-container'>
                        <Button text='Ürün ekle' size='sm' className='button' onClick={handleProductModalOpen} />
                        <Button text='Hizmet ekle' size='sm' className='button' onClick={handleServiceModalOpen} />
                    </div>
                </header>
                <main>
                    <Table headers={headers} items={store!.salesList.result} isLoading={store!.salesList.isLoading} fetchData={store!.getSale} />
                </main>
            </div>
            { showProductModal && <ProductModal id={id || 0} show={showProductModal} handleClose={handleProductModalClose} /> }
            { showServiceModal && <ServiceModal id={id || 0} show={showServiceModal} handleClose={handleServiceModalClose} /> }
        </>
    );
}));

export default Index;