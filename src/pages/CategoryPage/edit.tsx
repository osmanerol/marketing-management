import React, { FC, useEffect } from 'react';
import { Spinner } from '../../components';
import { observer, inject } from 'mobx-react';
import { Modal, Button } from 'react-bootstrap'; 
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import CategoryStore from '../../application/category/store/categoryStore';

interface IDefaultProps {
    CategoryStore? : typeof CategoryStore,
    id : any,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('CategoryStore')(observer((props : IDefaultProps) => {
    const { CategoryStore : store, id, show, handleClose } = props;

    const createCategory = async () => {
        await store!.createCategory();
    }

    const getCategory = async () => {
        await store!.get(id);
    }

    const categorySchema = yup.object().shape({
        name : yup.string().required('Zorunlu alan')
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
        createCategory();
        if(id){
            getCategory();
        }
    }, [])
 
    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Kategoriler</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (id && store!.category.id === null) || (!id && store!.category.id !== null) ?
                    <Spinner />:
                    <div className='row'>
                        <div className='col-md-6 col-12'>
                            <Input id='name' text='Ad' defaultValue={store!.category.name} register={register} errors={errors} onChange={(event: any) => store!.category.name = event.target.value } />
                        </div>
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