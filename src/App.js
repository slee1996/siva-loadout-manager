import React from 'react';
import './styling/app.css';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import Nav from './Components/Nav'

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/' || '/register'
      ? (<>
          {routes}
        </>)
      : (<>
          <Nav />
          {routes}
        </>)}
    </div>
  );
}

export default withRouter(App);
