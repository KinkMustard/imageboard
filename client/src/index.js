import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import io from "socket.io-client";
// import Demo from "./components/messages/Demo";
import reducers from "./reducers";
import CreateMessage from "./components/messages/CreateMessage";
import MessageDisplayer from "./components/messages/MessageDisplayer";
import ColorController from "./components/colors/ColorController";
import registerServiceWorker from "./registerServiceWorker";

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles, MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Button from "material-ui/Button";
import purple from "material-ui/colors/purple";
import green from "material-ui/colors/green";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const endPoint = "http://192.168.1.97:5000";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CreateMessage />
        <MessageDisplayer />
        <ColorController />
      </React.Fragment>
    );
  }
}

const rootElement = document.querySelector("#root");
if (rootElement) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}
registerServiceWorker();
