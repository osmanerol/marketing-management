import React, { FC, useEffect } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Input, Button } from '../../components';
import SignupImage from '../../assets/signup.jpg';
import UserStore from '../../application/user/store/userStore';

interface IDefaultProps{
    UserStore? : typeof UserStore
}

const Index : FC<IDefaultProps> = inject('UserStore')(observer((props : IDefaultProps) => {
    const { UserStore : store } = props;
    const history = useHistory();
    const toast = useToast();

    useEffect(() => {
        if(localStorage.getItem('logged-in')){
            history.push('/panel');
        }
        else{
            store!.error = null;
            store!.createUser();
        }
    }, [])

    const handleSubmit = async () => {
        if(store!.user.email !== '' && store!.user.password !== ''){
            await store!.signup();
            if(store!.error){
                toast({
                    title: "Hata",
                    description: "Hesap oluşturulurken hata oluştu. Tekrar deneyiniz.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
            else{
                toast({
                    title: "Kayıt Başarılı",
                    description: "Giriş ekranına yönlendiriliyorsunuz.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setTimeout(() => {
                    history.push('/login');
                }, 2000)
            }
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
                            <Input text='E-posta' type='email' onChange={(event : any) => store!.user.email = event?.target.value } />
                            <Input type='password' text='Şifre' onChange={(event : any) => store!.user.password = event?.target.value } />
                            <Button text='Hesap Oluştur' className='form-button' onClick={handleSubmit} />
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
}));

export default Index;