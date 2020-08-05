import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './Header';
import Home from '../views/Home';
import CalendarScroll from '../views/CalendarScroll';
import Message from '../components/Message';
import UserBookings from '../views/UserBookings';
import CreateUser from '../views/CreateUser';
import Login from '../views/Login';
import { Sidebar, Segment } from 'semantic-ui-react';

const App = () => {
  return (
    <div>
      <div className="background-gradient"></div>
      <Message />
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user/login" component={Login}></Route>
          <Route path="/user/create" component={CreateUser}></Route>
          <Route path="/:service/bookings" component={UserBookings}></Route>
          <Route path="/:service/calendar" exact component={CalendarScroll}></Route>
          {/* <Route path="/:service/calendar/:year/:month/:date" component={CaldenarDay}></Route> */}
        </Switch>
      </Router>
    </div>)
}

export default App;