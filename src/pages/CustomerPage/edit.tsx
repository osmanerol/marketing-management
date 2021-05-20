import React, { FC, useEffect } from 'react';
import { Spinner } from '../../components';
import { observer, inject } from 'mobx-react';
import { Modal, Button } from 'react-bootstrap'; 
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import CustomerStore from '../../application/customer/store/customerStore';

interface IDefaultProps {
    CustomerStore? : typeof CustomerStore,
    id : any,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('CustomerStore')(observer((props : IDefaultProps) => {
    const { CustomerStore : store, id, show, handleClose } = props;

    const createCustomer = async () => {
        await store!.createCustomer();
    }

    const getCustomer = async () => {
        await store!.get(id);
    }

    const categorySchema = yup.object().shape({
        firstname : yup.string().required('Zorunlu alan'),
        lastname : yup.string().required('Zorunlu alan'),
        identity : yup.string().length(11, '11 haneli değer giriniz').required('Zorunlu alan'),
        phone : yup.string().length(11, '11 haneli değer giriniz').required('Zorunlu alan'),
        email : yup.string().required('Zorunlu alan'),
        address : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(categorySchema)
    })

    const handleConfirm = async () => {
        if(id === 0){
            await store!.create();
        }
        else{
            await store!.update(id);
        }
        handleClose();
    }
    
    useEffect(() => {
        createCustomer();
        if(id){
            getCustomer();
        }
    }, [])
 
    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Müşteriler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (id && store!.customer.id === null) || (!id && store!.customer.id !== null) ?
                    <Spinner />:
                    <div className='row'>
                        <Input className='col-md-6 col-12 mb-2' id='firstname' text='Ad' defaultValue={store!.customer.firstname} register={register} errors={errors} onChange={(event: any) => store!.customer.firstname = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='lastname' text='Soyad' defaultValue={store!.customer.lastname} register={register} errors={errors} onChange={(event: any) => store!.customer.lastname = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='identity' text='Kimlik Numarası' defaultValue={store!.customer.identity} register={register} errors={errors} onChange={(event: any) => store!.customer.identity = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='phone' text='Telefon' defaultValue={store!.customer.phone} register={register} errors={errors} onChange={(event: any) => store!.customer.phone = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='email' text='Email' defaultValue={store!.customer.email} register={register} errors={errors} onChange={(event: any) => store!.customer.email = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='address' text='Adres' defaultValue={store!.customer.address} register={register} errors={errors} onChange={(event: any) => store!.customer.address = event.target.value } />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant='primary' onClick={handleSubmit(handleConfirm)}>
                    Kaydet
                </Button>
            </Modal.Footer>
      </Modal>
    );
}));

export default Index;