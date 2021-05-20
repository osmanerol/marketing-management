import React, { FC , useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import Edit from './edit';
import CategoryStore from '../../application/category/store/categoryStore';

interface IDefaultProps {
    CategoryStore? : typeof CategoryStore
}

const Index : FC<IDefaultProps> = inject('CategoryStore')(observer((props : IDefaultProps) => {
    const { CategoryStore : store } = props;
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState<any>(null);
    const headers = [ { name : 'Ad', accessor : 'name'}];

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
                    <h3 className='title'>Kategoriler</h3>
                    <Button text='Kategori ekle' size='sm' className='button' onClick={handleOpenModal} />
                </header>
                <main>
                    <Table headers={headers} items={store!.categoryList.result} isLoading={store!.categoryList.isLoading} clickUpdate={handleUpdate} clickDelete={handleDelete} fetchData={store!.getAll} />
                </main>
            </div>
            { showModal && <Edit id={id || 0} show={showModal} handleClose={handleCloseModal} /> }
        </>
    );
}));

export default Index;