import React, { FC, useEffect, useState } from 'react';
import { Spinner, DropDown } from '../../components';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal, Button } from 'react-bootstrap'; 
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import ProductStore from '../../application/product/store/productStore';
import CategoryStore from '../../application/category/store/categoryStore';

interface IDefaultProps {
    ProductStore? : typeof ProductStore,
    CategoryStore? : typeof CategoryStore,
    id : any,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('ProductStore', 'CategoryStore')(observer((props : IDefaultProps) => {
    const { ProductStore : store, CategoryStore : categoryStore, id, show, handleClose } = props;
    const [categoryId, setCategoryId] = useState(null);

    const createproduct = async () => {
        await store!.createproduct();
    }

    const getProduct = async () => {
        await store!.get(id);
    }

    const getCategory = async () => {
        await categoryStore!.getAll();
    }

    const categorySchema = yup.object().shape({
        name : yup.string().required('Zorunlu alan'),
        category : yup.string().required('Zorunlu alan'),
        description : yup.string().required('Zorunlu alan'),
        price : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(categorySchema)
    })

    const handleConfirm = async () => {
        if(id === 0){
            await store!.create(categoryId);
        }
        else{
            await store!.update(id, categoryId);
        }
        handleClose();
    }

    useEffect(() => {
        if(store!.product.id){
            categoryStore!.categoryList.result.forEach((item : any) => {
                if(item.name === store!.product.category){
                    setCategoryId(item.id);
                }
            })
        }
    }, [store?.product.category])
    
    useEffect(() => {
        createproduct();
        if(id){
            getProduct();
        }
        getCategory();
    }, [])
 

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Ürünler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (id && store!.product.id === null) || (!id && store!.product.id !== null) ?
                    <Spinner />:
                    <div className='row'>
                        <Input className='col-md-6 col-12 mb-2' id='name' text='Ad' defaultValue={store!.product.name} register={register} errors={errors} onChange={(event: any) => store!.product.name = event.target.value } />
                        <DropDown className='col-md-6 col-12 mb-2' value='id' accessor='name' defaultValue={categoryStore!.categoryList.result.find((item : any) => item.name === store!.product.category)?.id} data={toJS(categoryStore!.categoryList.result)} id='category' text='Kategori' register={register} errors={errors} 
                        onChange={(event: any) => setCategoryId(event.target.value) } />
                        <Input className='col-md-6 col-12 mb-2' id='description' text='Açıklama' defaultValue={store!.product.description} register={register} errors={errors} onChange={(event: any) => store!.product.description = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='price' text='Ücret' type='number' defaultValue={store!.product.price > 0 ? store!.product.price.toString() : ''} register={register} errors={errors} onChange={(event: any) => store!.product.price = event.target.value } />
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