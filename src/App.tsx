import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';

// pages
import CategoryPage from './pages/CategoryPage';
import CustomerPage from './pages/CustomerPage';
import ProductPage from './pages/ProductPage';
import ServicePage from './pages/ServicePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/login' />
        <Route path='/panel/category' exact strict component={CategoryPage} />
        <Route path='/panel/customer' exact strict component={CustomerPage} />
        <Route path='/panel/ProductPage' exact strict component={ProductPage} />
        <Route path='/panel/ServicePage' exact strict component={ServicePage} />
        <Route path='/login' exact strict component={LoginPage} />
        <Route path='/signup' exact strict component={SignupPage} />
        <Route exact strict component={NotFoundPage} />
      </Switch>
    </>
  );
};


export default App;