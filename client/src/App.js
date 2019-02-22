import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from 'ROUTES';
import RoomsList from 'PAGES/RoomsList';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Switch>
        <Route exact path={Routes.ROOMS_LIST} component={RoomsList} />
        <Route exact path={Routes.ROOM} component={() => <p>Room</p>} />
        <Route exact path={Routes.PROFILE} component={() => <p>Profile</p>} />
        <Route component={() => <p>404 not found</p>} />
      </Switch>
    );
  }
}
