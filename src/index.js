import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Basic from "./Basic";
import Carousel from "./Carousel";
import Controlled from "./Controlled";
import CustomComponents from "./CustomComponents";
import Modal from "./Modal";
import Scroll from "./Scroll";

import Footer from "./components/Footer";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="demo">
          <Switch>
            <Route exact path="/" component={Basic} />
            <Route path="/controlled" component={Controlled} />
            <Route path="/custom" component={CustomComponents} />
            <Route path="/carousel" component={Carousel} />
            <Route path="/modal" component={Modal} />
            <Route path="/scroll" component={Scroll} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
