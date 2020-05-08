import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import Home from '../views/Home';
import Calendar from '../views/Calendar';
import CaldenarDay from '../components/CalendarDay';
import Message from '../components/Message';
import UserBookings from '../views/UserBookings';
import CreateUser from '../views/CreateUser';
import Login from '../views/Login';

// import { createBrowserHistory } from 'history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <Message />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/user/create" component={CreateUser}></Route>
          <Route path="/bookings" component={UserBookings}></Route>
          <Route path="/calendar/:year/:month" exact component={Calendar}></Route>
          <Route path="/calendar/:year/:month/:date" component={CaldenarDay}></Route>
        </Switch>
      </Router>
    </div>)
}

export default App;