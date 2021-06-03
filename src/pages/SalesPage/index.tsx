import React, { FC } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import { useHistory } from 'react-router-dom';
import SalesStore from '../../application/sales/store/salesStore';

interface IDefaultProps {
    SalesStore? : typeof SalesStore,
}

const Index : FC<IDefaultProps> = inject('SalesStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store } = props;
    const history = useHistory();
    const headers = [ { name : 'Müşteri Id', accessor : 'customerId'}, { name : 'Toplam Fiyat', accessor : 'totalPrice'}, { name : 'Tarih', accessor : 'date'} ];

    const handleInspect = (id : any) => {
        store!.selectedItemId = id;
        history.push('/panel/sales/add');
    }

    const addSales = () => {
        store!.selectedItemId = 1;
        history.push('/panel/sales/add');
    }

    return (
        <>
            <div className='page-container'>
                <header>
                    <h3 className='title'>Satışlar</h3>
                    <Button text='Satış ekle' size='sm' className='button' onClick={addSales} />
                </header>
                <main>
                    <Table headers={headers} items={store!.salesList.result} isLoading={store!.salesList.isLoading} clickInspect={handleInspect} fetchData={store!.getAll} />
                </main>
            </div>
        </>
    );
}));

export default Index;