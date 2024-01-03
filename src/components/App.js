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
import Logout from '../views/Logout';
import Loader from './Loader';
import '../styles/main.scss';

const App = () => { 
  return (
    <>
      <Header/>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/user/logout" component={Logout}></Route>
          <Route path="/user/authenticate/:token/:serviceId/:residenceId" component={SignInWithToken}></Route>
          <Route path="/user/forgot-password" component={ForgotPassword}></Route>
          <Route path="/user/create/:residenceId" component={CreateUser}></Route>
          <Route path="/:service/bookings" component={UserBookings}></Route>
          <Route path="/:service/calendar/:year/:month" exact component={Calendar}></Route>
          <Route path="/:service/calendar/:year/:month/:day" exact component={Calendar}></Route>
        </Switch>
      </Router>
      <Footer />
      <UserMessage />
      <Loader />
    </>);
}

export default App;