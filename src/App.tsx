import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoute } from './components';
import { Switch, Route, Redirect } from 'react-router-dom';

// pages
import { PanelPage, LoginPage, SignupPage, NotFoundPage } from './pages';

const App = () => {
  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/login' />
        <PrivateRoute path='/panel' component={PanelPage} />
        <Route path='/login' exact strict component={LoginPage} />
        <Route path='/signup' exact strict component={SignupPage} />
        <Route exact strict component={NotFoundPage} />
      </Switch>
    </>
  );
};


export default App;