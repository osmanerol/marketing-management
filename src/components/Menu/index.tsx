import React, { useState, useEffect } from 'react';
import './index.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import { FaUsers } from 'react-icons/fa';
import { RiSettings3Fill } from 'react-icons/ri';
import { FaProjectDiagram } from 'react-icons/fa';
import { GiTennisBall } from 'react-icons/gi';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdPayment } from 'react-icons/md';
import { RiLogoutCircleRFill } from 'react-icons/ri';

const Index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobileScreen, setIsMobileScreen] = useState(false);    
    const history = useHistory();

    useEffect(() => {
        // detect screen size for small or large
        function detectScreenSize() {
            if(window.innerWidth <= 768){
                setIsMobileScreen(true);
            }
            else{
                setIsMobileScreen(false);
            }
        }
        window.addEventListener('resize', detectScreenSize);
        detectScreenSize();
    }, [])

    const logout = () => {
        localStorage.clear();
        history.push('/login');
    }

    return (
        <div className="menu">
            <h4 className='menu-title'>Marketing Management</h4>
            {
                isMobileScreen ? 
                <>
                    <AiOutlineMenu onClick={onOpen} className='menu-icon' />
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                                <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <div className="menu-items" onClick={onClose}>
                                    <NavLink to='/panel/category' className='menu-item-link'><FaProjectDiagram className='icon' /> <span>Kategoriler</span></NavLink>
                                    <NavLink to='/panel/product' className='menu-item-link'><GiTennisBall className='icon' /> <span>Ürünler</span></NavLink>
                                    <NavLink to='/panel/service' className='menu-item-link'><RiSettings3Fill className='icon' /> <span>Servisler</span></NavLink>
                                    <NavLink to='/panel/customer' className='menu-item-link'><FaUsers className='icon' /> <span>Müşteriler</span></NavLink>
                                    <NavLink to='/panel/sales' className='menu-item-link'><MdPayment className='icon' /> <span>Satışlar</span></NavLink>
                                    <span className='menu-item-link' onClick={logout}><RiLogoutCircleRFill className='icon' /> <span>Çıkış Yap</span></span>
                                </div>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </>
                :
                <div className="menu-items">
                    <NavLink to='/panel/category' className='menu-item-link'><FaProjectDiagram className='icon' /> <span>Kategoriler</span></NavLink>
                    <NavLink to='/panel/product' className='menu-item-link'><GiTennisBall className='icon' /> <span>Ürünler</span></NavLink>
                    <NavLink to='/panel/service' className='menu-item-link'><RiSettings3Fill className='icon' /> <span>Servisler</span></NavLink>
                    <NavLink to='/panel/customer' className='menu-item-link'><FaUsers className='icon' /> <span>Müşteriler</span></NavLink>
                    <NavLink to='/panel/sales' className='menu-item-link'><MdPayment className='icon' /> <span>Satışlar</span></NavLink>
                    <span className='menu-item-link' onClick={logout}><RiLogoutCircleRFill className='icon' /> <span>Çıkış Yap</span></span>
                </div>
            }
        </div>
    );
};

export default Index;