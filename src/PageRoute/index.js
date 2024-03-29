import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../Pages/Home";
import CardDetails from "../Pages/CardDetails";
/**
 * function for page routing
 * @function
 */
function PageRoute() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect exact from="/home" to="/" />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route path="/:slug" component={CardDetails} />
          <Route path="*" component={() => <h2>404 Not Found</h2>} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default PageRoute;
