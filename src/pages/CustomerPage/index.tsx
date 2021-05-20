import React, { FC , useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from '../../components';
import Edit from './edit';
import CustomerStore from '../../application/customer/store/customerStore';

interface IDefaultProps {
    CustomerStore? : typeof CustomerStore
}

const Index : FC<IDefaultProps> = inject('CustomerStore')(observer((props : IDefaultProps) => {
    const { CustomerStore : store } = props;
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState<any>(null);
    const headers = [ { name : 'Ad', accessor : 'firstname'}, { name : 'Soyad', accessor : 'lastname'}, { name : 'Kimlik Numarası', accessor : 'identity'}, { name : 'Telefon', accessor : 'phone'}, { name : 'Email', accessor : 'email'}, { name : 'Adres', accessor : 'address'} ];

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
                    <h3 className='title'>Müşteriler</h3>
                    <Button text='Müşteri ekle' size='sm' className='button' onClick={handleOpenModal} />
                </header>
                <main>
                    <Table headers={headers} items={store!.customerList.result} isLoading={store!.customerList.isLoading} clickUpdate={handleUpdate} clickDelete={handleDelete} fetchData={store!.getAll} />
                </main>
            </div>
            { showModal && <Edit id={id || 0} show={showModal} handleClose={handleCloseModal} /> }
        </>
    );
}));

export default Index;