import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import asyncComponent from '../helpers/asyncComponent';

export default class App extends Component {
  constructor() {
    super();
    this.state = {tabs: undefined};
  }

  componentDidMount() {
    fetch('./client/tabs.json')
      .then(res => res.json())
      .then(tabs => {
        tabs.sort((a,b) => a.order - b.order);
        this.setState({tabs});
      });
  }

  get links() {
    return this.state.tabs.map((tab, i) => 
      <Link key={i} to={'/' + tab.id}>{tab.title}</Link>
    );
  }

  get routes() {
    let {state:{tabs}} = this;
    let TabComponents = tabs.map(tab => {
      return asyncComponent(() => 
        System.import('./' + tab.path).then(module => module.default)
      );
    });

    return [
      ...TabComponents.map((TabComponent, i) => {
        return <Route key={i} path={'/' + tabs[i].id} component={TabComponent}/>;
      }),
      // added one more route as default 
      <Route key={tabs.length} path='/' component={TabComponents[0]}/>
    ];
  }

  render() {
    if (!this.state.tabs) {
      return <div>Loading</div>;
    }

    return (
      <Router>
        <div>
          <nav>{this.links}</nav>
          <main>
            <Switch>
              {this.routes}
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}