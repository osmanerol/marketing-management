import React from 'react';
import './index.scss';
import { Menu } from '../../components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { CategoryPage, CustomerPage, ProductPage, ServicePage, SalesPage, VisitPage, AddSalesPage } from '../index';
    
const Index = () => {

    return (
        <div className='panel-container'>   
            <Menu />
            <div className="content">
                <Switch>
                    <Redirect exact from='/panel' to='/panel/category' />
                    <Route path='/panel/category' component={CategoryPage} />
                    <Route path='/panel/product' component={ProductPage} />
                    <Route path='/panel/service' component={ServicePage} />
                    <Route path='/panel/customer' component={CustomerPage} />   
                    <Route path='/panel/sales' exact component={SalesPage} />   
                    <Route path='/panel/sales/add' component={AddSalesPage} />   
                    <Route path='/panel/visits' component={VisitPage} />   
                </Switch>
            </div>
        </div>
    );
};

export default Index;