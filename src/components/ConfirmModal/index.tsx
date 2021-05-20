import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap'; 

interface IDefaultProps {
    show : boolean;
    handleClose : any,
    handleConfirm : any
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { show, handleClose, handleConfirm } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Onay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>İşlemi yapmak istediğinize emin misiniz ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant='primary' onClick={handleConfirm}>
                    Kaydet
                </Button>
            </Modal.Footer>
      </Modal>
    );
};

export default Index;