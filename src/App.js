import React from 'react';
import './styling/app.css';
import Dashboard from './Components/Dashboard'
import routes from './routes'
import {withRouter} from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/'
      ? (<>
          {routes}
        </>)
      : (<>
          {routes}
        </>)}
    </div>
  );
}

export default withRouter(App);
