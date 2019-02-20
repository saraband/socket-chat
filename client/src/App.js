import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from 'ROUTES';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    fetch('http://localhost:3000/foo')
      .then(res => res.text())
      .then(data => console.log(`Server responded: '${data}'`));
  }

  render () {
    return (
      <Switch>
        <Route exact path={Routes.ROOMS_LIST} component={() => <p>Rooms list</p>} />
        <Route exact path={Routes.ROOM} component={() => <p>Room</p>} />
        <Route exact path={Routes.PROFILE} component={() => <p>Profile</p>} />
        <Route component={() => <p>404 not found</p>} />
      </Switch>
    );
  }
}