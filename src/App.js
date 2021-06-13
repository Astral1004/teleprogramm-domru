import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ChannelList from './Components/ChannelList/ChannelList';
import ChannelProgramm from './Components/ChannelProgramm/ChannelProgramm';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ChannelList channels={this.props.channels} />
            )}
          />
          <Route path="/channel/:id" component={ChannelProgramm} />
        </Switch>
      </Router>
    );
  }
}

export default App;
