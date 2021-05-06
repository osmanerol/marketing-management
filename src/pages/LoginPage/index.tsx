import React, { useState } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Input, Button } from '../../components';
import LoginImage from '../../assets/login.jpg';

const Index = () => {
    const [user, setUser] = useState({
        username : '',
        password: ''
    })
    const toast = useToast();

    const clickLogin = () => {
        if(user.username !== '' && user.password !== ''){
            toast({
                title: "Giriş Başarılı",
                description: "Panele yönlendiriliyorsunuz.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: "Hata",
                description: "Tüm alanları doldurunuz.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Container className='loginpage-container'>
            <div className="items">
                <div className="item image">
                    <img src={LoginImage} alt='login'/>
                </div>
                <form className="item form">
                    <div className='form-item'>
                        <h2 className='title'>Marketing Management</h2>
                        <h2 className='sub-title'>Hesaba giriş yap</h2>
                        <div className='form-element'>
                            <Input text='Kullanıcı adı' onChange={(event : any) => setUser({...user, username : event?.target.value})} />
                            <Input type='password' text='Şifre' onChange={(event : any) => setUser({...user, password : event?.target.value})} />
                            <Button text='Giriş Yap' className='form-button' onClick={clickLogin} />
                        </div>
                        <div className="go-signup">
                            <p>Hesabın yok mu ? <Link to='/signup'>Kaydol</Link></p>
                        </div>
                        <div className="aggreements">
                            <Link to='/'>Üyelik Sözleşmesi , </Link>
                            <Link to='/'>Gizlilik Sözleşmesi</Link>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default Index;