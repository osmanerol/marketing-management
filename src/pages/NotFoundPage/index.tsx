import React from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import Notfound from '../../assets/notfound.svg';

const Index = () => {
    return (
        <Container className='notfoundpage-container'>
            <div className="notfound-item">
                <div className='notfound-data'>
                    <img src={Notfound} alt="notfound"/>
                    <p className='description'>Aradığınız sayfa bulunamadı.</p>
                </div>
            </div>
        </Container>
    );
};

export default Index;