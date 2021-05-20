import React, { useState } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Input, Button } from '../../components';
import SignupImage from '../../assets/signup.jpg';

const Index = () => {
    const [user, setUser] = useState({
        username : '',
        password: ''
    })
    const history = useHistory();
    const toast = useToast();

    const clickSignup = () => {
        if(user.username !== '' && user.password !== ''){
            toast({
                title: "Giriş Başarılı",
                description: "Giriş ekranına yönlendiriliyorsunuz.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            setTimeout(() => {
                history.push('/login');
            }, 2000)
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
        <Container className='signuppage-container'>
            <div className="items">
                <div className="item image">
                    <img src={SignupImage} alt='signup'/>
                </div>
                <form className="item form">
                    <div className='form-item'>
                        <h2 className='title'>Marketing Management</h2>
                        <h2 className='sub-title'>Yeni hesap oluştur</h2>
                        <div className='form-element'>
                            <Input text='Kullanıcı adı' onChange={(event : any) => setUser({...user, username : event?.target.value})} />
                            <Input type='password' text='Şifre' onChange={(event : any) => setUser({...user, password : event?.target.value})} />
                            <Button text='Hesap Oluştur' className='form-button' onClick={clickSignup} />
                        </div>
                        <div className="go-login">
                            <p className='text'>Zaten hesabın var mı ? <Link to='/login'>Giriş Yap</Link></p>
                        </div>
                        <div className="aggreements">
                            <Link to='/' className='text'>Üyelik Sözleşmesi , </Link>
                            <Link to='/' className='text'>Gizlilik Sözleşmesi</Link>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default Index;