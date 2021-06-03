import React, { FC, useEffect, useState } from 'react';
import { Spinner, DropDown } from '../../components';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal, Button } from 'react-bootstrap'; 
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import ServiceStore from '../../application/service/store/serviceStore';
import CategoryStore from '../../application/category/store/categoryStore';

interface IDefaultProps {
    ServiceStore? : typeof ServiceStore,
    CategoryStore? : typeof CategoryStore,
    id : any,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('ServiceStore', 'CategoryStore')(observer((props : IDefaultProps) => {
    const { ServiceStore : store, CategoryStore : categoryStore, id, show, handleClose } = props;
    const [categoryId, setCategoryId] = useState(null);

    const createService = async () => {
        await store!.createService();
    }

    const getService = async () => {
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
        if(store!.service.id){
            categoryStore!.categoryList.result.forEach((item : any) => {
                if(item.name === store!.service.category){
                    setCategoryId(item.id);
                }
            })
        }
    }, [store?.service.category])
    
    useEffect(() => {
        createService();
        if(id){
            getService();
        }
        getCategory();
    }, [])
 

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Hizmetler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (id && store!.service.id === null) || (!id && store!.service.id !== null) ?
                    <Spinner />:
                    <div className='row'>
                        <Input className='col-md-6 col-12 mb-2' id='name' text='Ad' defaultValue={store!.service.name} register={register} errors={errors} onChange={(event: any) => store!.service.name = event.target.value } />
                        <DropDown className='col-md-6 col-12 mb-2' value='id' accessor='name' defaultValue={categoryStore!.categoryList.result.find((item : any) => item.name === store!.service.category)?.id} data={toJS(categoryStore!.categoryList.result)} id='category' text='Kategori' register={register} errors={errors} 
                        onChange={(event: any) => setCategoryId(event.target.value) } />
                        <Input className='col-md-6 col-12 mb-2' id='description' text='Açıklama' defaultValue={store!.service.description} register={register} errors={errors} onChange={(event: any) => store!.service.description = event.target.value } />
                        <Input className='col-md-6 col-12 mb-2' id='price' text='Ücret' type='number' defaultValue={store!.service.price > 0 ? store!.service.price.toString() : ''} register={register} errors={errors} onChange={(event: any) => store!.service.price = event.target.value } />
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