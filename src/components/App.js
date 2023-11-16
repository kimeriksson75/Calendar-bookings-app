import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import Footer from './Footer';
import Home from '../views/Home';
import Calendar from '../views/Calendar';
import UserMessage from '../components/Message';
import UserBookings from '../views/UserBookings';
import CreateUser from '../views/CreateUser';
import Login from '../views/Login';
import SignInWithToken from './SignInWithToken';
import ForgotPassword from '../views/ForgotPassword';

const App = () => { 
  return (
    <>
      <Header/>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/user/authenticate/:token/:serviceId/:residenceId" component={SignInWithToken}></Route>
          <Route path="/user/forgot-password" component={ForgotPassword}></Route>
          <Route path="/user/create" component={CreateUser}></Route>
          <Route path="/:service/bookings" component={UserBookings}></Route>
          <Route path="/:service/calendar/:year/:month" exact component={Calendar}></Route>
          <Route path="/:service/calendar/:year/:month/:day" exact component={Calendar}></Route>
        </Switch>
      </Router>
      <UserMessage />
      <Footer />
    </>);
}

export default App;