import React, { FC, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal, Button } from 'react-bootstrap'; 
import { DropDown } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import VisitStore from '../../application/visit/store/visitStore';
import CustomerStore from '../../application/customer/store/customerStore';
import ProductStore from '../../application/product/store/productStore';
import ServiceStore from '../../application/service/store/serviceStore';

interface IDefaultProps {
    VisitStore? : typeof VisitStore,
    CustomerStore? : typeof CustomerStore,
    ProductStore? : typeof ProductStore,
    ServiceStore? : typeof ServiceStore,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('VisitStore', 'CustomerStore', 'ProductStore', 'ServiceStore')(observer((props : IDefaultProps) => {
    const { VisitStore : store, CustomerStore: customerStore, ProductStore : productStore, ServiceStore : serviceStore, show, handleClose } = props;

    const createVisit = async () => {
        await store!.createVisit();
    }

    const visitSchema = yup.object().shape({
        customer : yup.string().required('Zorunlu alan'),
        name : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(visitSchema)
    })

    const handleConfirm = async () => {
        await store!.create();
        handleClose();
    }
    
    const getCustomers = async () => {
        await customerStore!.getAll();
    }

    const getProducts = async () => {
        await productStore!.getProducts();
    }

    const getServices = async () => {
        await serviceStore!.getServices();
    }

    useEffect(() => {
        getCustomers();
        getProducts();
        getServices();
        createVisit();
    }, [])
 
    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Ziyaretler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <div className='row'>
                        <DropDown className='col-md-6 col-12 mb-2' value='email' accessor='email' defaultValue={''} data={toJS(customerStore!.customerList.result)} id='customer' text='Müşteri' register={register} errors={errors} onChange={(event: any) => store!.visit.customer = event.target.value } />
                        <DropDown className='col-md-6 col-12 mb-2' value='name' accessor='name' defaultValue={''} data={[...toJS(productStore!.productList.result), ...toJS(serviceStore!.serviceList.result)]} id='name' text='Ürün/Hizmet' register={register} errors={errors} onChange={(event: any) => store!.visit.name = event.target.value } />
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