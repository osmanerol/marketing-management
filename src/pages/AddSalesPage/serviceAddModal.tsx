import React, { FC, useEffect, useState } from 'react';
import { Spinner, DropDown } from '../../components';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal, Button } from 'react-bootstrap'; 
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import SalesStore from '../../application/sales/store/salesStore';
import ServiceStore from '../../application/service/store/serviceStore';

interface IDefaultProps {
    SalesStore? : typeof SalesStore,
    ServiceStore? : typeof ServiceStore,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('SalesStore', 'ServiceStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store, ServiceStore : serviceStore, show, handleClose } = props;

    const createEmptyProduct = async () => {
        await store!.createEmptyProduct();
    }

    const createEmptyService = async () => {
        await store!.createEmptyService();
    }

    const getServices = async () => {
        await serviceStore!.getServices();
    }

    const productSchema = yup.object().shape({
        service : yup.string().required('Zorunlu alan'),
        amount : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(productSchema)
    })

    const handleConfirm = async () => {
        let price = ServiceStore.serviceList.result.find((item : any) => item.name === store!.service.name)!.price;
        store!.service.price = price * store!.service.amount;
        store!.addSaleItemList();
        handleClose();
    }

    useEffect(() => {
        createEmptyProduct();
        createEmptyService();
        getServices();
    }, [])

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Servis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <div className='row'>
                        <DropDown className='col-md-6 col-12 mb-2' value='id' accessor='name' defaultValue={''} data={toJS(serviceStore!.serviceList.result)} id='service' text='Servis' register={register} errors={errors} 
                        onChange={(event: any) => store!.service.name = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='amount' text='Adet' defaultValue={''} register={register} errors={errors} onChange={(event: any) => store!.service.amount = event.target.value } />
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