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
    id : any,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('SalesStore', 'ServiceStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store, ServiceStore : serviceStore, id, show, handleClose } = props;
    const [serviceId, setServiceId] = useState(null);

    const createProduct = async () => {
        //await store!.createProduct();
    }

    const getServices = async () => {
        await serviceStore!.getServices();
    }

    const serviceSchema = yup.object().shape({
        service : yup.string().required('Zorunlu alan'),
        amount : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(serviceSchema)
    })

    const handleConfirm = async () => {
        if(id === 0){
            await store!.create(serviceId);
        }
        else{
            await store!.update(id, serviceId);
        }
        handleClose();
    }

    /*
    useEffect(() => {
        if(store!.service.id){
            categoryStore!.categoryList.result.forEach((item : any) => {
                if(item.name === store!.service.category){
                    setCategoryId(item.id);
                }
            })
        }
    }, [store?.service.category])
    */

    useEffect(() => {
        /*
        createService();
        if(id){
            getService();
        }
        */
        getServices();
    }, [])

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Servis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    //(id && store!.service.id === null) || (!id && store!.service.id !== null) ?
                    false ?
                    <Spinner />:
                    <div className='row'>
                        <DropDown className='col-md-6 col-12 mb-2' value='id' accessor='name' defaultValue={''} data={toJS(serviceStore!.serviceList.result)} id='service' text='Servis' register={register} errors={errors} 
                        onChange={(event: any) => setServiceId(event.target.value) } />
                        <Input className='col-md-6 col-12 mb-2' id='amount' text='Adet' defaultValue={''} register={register} errors={errors} onChange={(event: any) => {} } />
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