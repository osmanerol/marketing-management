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
import ProductStore from '../../application/product/store/productStore';

interface IDefaultProps {
    SalesStore? : typeof SalesStore,
    ProductStore? : typeof ProductStore,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('SalesStore', 'ProductStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store, ProductStore : productStore, show, handleClose } = props;

    const createEmptyProduct = async () => {
        await store!.createEmptyProduct();
    }

    const createEmptyService = async () => {
        await store!.createEmptyService();
    }

    const getProducts = async () => {
        await productStore!.getProducts();
    }

    const productSchema = yup.object().shape({
        product : yup.string().required('Zorunlu alan'),
        amount : yup.number().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(productSchema)
    })

    const handleConfirm = async () => {
        let price = ProductStore.productList.result.find((item : any) => item.name === store!.product.name)!.price;
        store!.product.price = price * store!.product.amount;
        store!.addSaleItemList();
        handleClose();
    }

    useEffect(() => {
        createEmptyProduct();
        createEmptyService();
        getProducts();
    }, [])

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Ürün</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <div className='row'>
                        <DropDown className='col-md-6 col-12 mb-2' value='id' accessor='name' defaultValue={''} data={toJS(productStore!.productList.result)} id='product' text='Ürün' register={register} errors={errors} 
                        onChange={(event: any) => store!.product.name = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' type='number' id='amount' text='Adet' defaultValue={''} register={register} errors={errors} onChange={(event: any) => store!.product.amount = event.target.value } />
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