import React, { FC, useEffect } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Input, Button } from '../../components';
import LoginImage from '../../assets/login.jpg';
import UserStore from '../../application/user/store/userStore';

interface IDefaultProps{
    UserStore? : typeof UserStore
}

const Index : FC<IDefaultProps> = inject('UserStore')(observer((props : IDefaultProps) => {
    const { UserStore : store } = props;
    const toast = useToast();
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('logged-in')){
            history.push('/panel');
        }
        else{
            store!.error = null;
            store!.createUser();
        }
    }, [])

    const handleLogin = async () => {
        if(store!.user.email !== '' && store!.user.password !== ''){
            await store!.login();
            if(store!.error){
                toast({
                    title: "Hata",
                    description: "E-posta veya şifre hatalı.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
            else{
                toast({
                    title: "Giriş Başarılı",
                    description: "Panele yönlendiriliyorsunuz.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                localStorage.setItem('logged-in', 'true');
                setTimeout(() => {
                    history.push('/panel');
                }, 2000)
            }
        }
        else{
            toast({
                title: "Hata",
                description: "Tüm alanları doldurunuz.",
                status: "error",
                duration: 2000,
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
                            <Input text='E-posta' type='email' onChange={(event : any) => store!.user.email = event?.target.value } />
                            <Input type='password' text='Şifre' onChange={(event : any) => store!.user.password = event?.target.value } />
                            <Button text='Giriş Yap' className='form-button' onClick={handleLogin} />
                        </div>
                        <div className="go-signup">
                            <p className='text'>Hesabın yok mu ? <Link to='/signup'>Kaydol</Link></p>
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