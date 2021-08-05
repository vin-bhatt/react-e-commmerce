import Home from './views/Home';
import Cart from './views/Cart'

import Dashboard from './layout/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function Routes() {
  return (
      <Router basename={'/react-e-commmerce'}>
          <Switch>
            <Route exact path="/">
              <Dashboard>
                <Home />
              </Dashboard>
            </Route>
            <Route path="/cart">
              <Dashboard>
                <Cart />
              </Dashboard>
            </Route>
          </Switch>
      </Router>
  );
}

export default Routes;
