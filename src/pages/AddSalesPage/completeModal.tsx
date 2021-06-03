import React, { FC, useEffect } from 'react';
import { DropDown } from '../../components';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal, Button } from 'react-bootstrap';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import SalesStore from '../../application/sales/store/salesStore';
import CustomerStore from '../../application/customer/store/customerStore';

interface IDefaultProps {
    SalesStore? : typeof SalesStore,
    CustomerStore? : typeof CustomerStore,
    show : boolean,
    handleClose : any,
}

const Index : FC<IDefaultProps> = inject('SalesStore', 'CustomerStore')(observer((props : IDefaultProps) => {
    const { SalesStore : store, CustomerStore : customerStore, show, handleClose } = props;
    const toast = useToast();
    const history = useHistory();

    const getCustomers = async () => {
        await customerStore!.getAll();
    }

    const productSchema = yup.object().shape({
        customer : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver : yupResolver(productSchema)
    })

    const handleConfirm = () => {
        if(store!.saleDetailList.result.length < 1){
            toast({
                title: "Hata",
                description: "Satın alınan hiçbir ürün yok.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            store!.sale.date = new Date();
            store!.create();
            handleClose();
            history.push('/panel/sales');
        }
    }
    
    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Satışı Tamamla</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <div className='row'>
                        <DropDown className='col-md-6 col-12 mb-2' value='id' accessor='email' defaultValue={''} data={toJS(customerStore!.customerList.result)} id='customer' text='Müşteri' register={register} errors={errors} 
                        onChange={(event: any) => store!.sale.customerId = event.target.value } />
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