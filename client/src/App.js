import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from 'ROUTES';
import RoomsList from 'PAGES/RoomsList';
import Room from 'PAGES/Room';
import DefaultLayout from 'LAYOUTS/Default';
import './Baseline.css';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <DefaultLayout>
        <Switch>
          <Route exact path={Routes.ROOMS_LIST} component={RoomsList} />
          <Route exact path={Routes.ROOM} component={Room} />
          <Route exact path={Routes.PROFILE} component={() => <p>Profile</p>} />
          <Route component={() => <p>404 not found</p>} />
        </Switch>
      </DefaultLayout>
    );
  }
}
