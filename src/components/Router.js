import React from 'react';
import { Route, BrowserRouter, withRouter, Redirect } from 'react-router-dom';
import Main from './Main/index';
import Head from './Head/index';
import Container from './Container';
import withTransition from './withRouteTransition';
import zip from 'lodash.zip';
import Menu from './Menu';

const routes = zip([
  '/head', '/youth', '/begin', '/impr', '/giverny'
], [
  <Head/>, <Main index="0"/>, <Main index="1"/>, <Main index="2"/>, <Main index="3"/>
]);

const WrappedContainer = withRouter(Container);

const Router = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <WrappedContainer>
        <Menu/>
        <Route exact path="/" render={() => <Redirect to="/head"/>}/>
        {routes.map(([ route, component ]) => {
          const Transitioned = withTransition(() => component);
          return <Route path={route} key={route}>
            {(props) => <Transitioned show={props.match !== null} {...props}/>}
          </Route>  
        })}
    </WrappedContainer>
  </BrowserRouter>
);

export default Router;

