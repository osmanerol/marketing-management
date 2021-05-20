import React, { FC , useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import Edit from './edit';
import ProductStore from '../../application/product/store/productStore';

interface IDefaultProps {
    ProductStore? : typeof ProductStore,
}

const Index : FC<IDefaultProps> = inject('ProductStore')(observer((props : IDefaultProps) => {
    const { ProductStore : store } = props;
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState<any>(null);
    const headers = [ { name : 'Ad', accessor : 'name'}, { name : 'Kategori', accessor : 'category'}, { name : 'Fiyat', accessor : 'price'}, { name : 'Açıklama', accessor : 'description'} ];

    const handleOpenModal = () => {
        setId(0);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleUpdate = (id : number) => {
        setId(id);
        setShowModal(true);
    }

    const handleDelete = async (id : number) => {
        await store!.delete(id);
    }

    return (
        <>
            <div className='page-container'>
                <header>
                    <h3 className='title'>Ürünler</h3>
                    <Button text='Ürün ekle' size='sm' className='button' onClick={handleOpenModal} />
                </header>
                <main>
                    <Table headers={headers} items={store!.productList.result} isLoading={store!.productList.isLoading} clickUpdate={handleUpdate} clickDelete={handleDelete} fetchData={store!.getAll} />
                </main>
            </div>
            { showModal && <Edit id={id || 0} show={showModal} handleClose={handleCloseModal} /> }
        </>
    );
}));

export default Index;