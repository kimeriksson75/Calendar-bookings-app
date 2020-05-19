import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import Home from '../views/Home';
import Calendar from '../views/Calendar';
import CaldenarDay from '../views/CalendarDay';
import Message from '../components/Message';
import UserBookings from '../views/UserBookings';
import CreateUser from '../views/CreateUser';
import Login from '../views/Login';
import { Sidebar, Segment } from 'semantic-ui-react';
// import { createBrowserHistory } from 'history';

const App = () => {
  return (
    <Sidebar.Pushable as={Segment} style={{ 'height': '100vh' }}>
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/user/create" component={CreateUser}></Route>
          <Route path="/bookings" component={UserBookings}></Route>
          <Route path="/calendar/:year/:month" exact component={Calendar}></Route>
          <Route path="/calendar/:year/:month/:date" component={CaldenarDay}></Route>
          <Message />
        </Switch>
      </Router>
    </Sidebar.Pushable>)
}

export default App;