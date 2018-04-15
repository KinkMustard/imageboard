import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Demo from "./demo";
// import Reducer from "./store/reducer";
import CreateMessage from "./createmessage";
import MessageDisplayer from "./messagedisplayer";

// const store = createStore(Reducer);

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CreateMessage />
        <MessageDisplayer />
      </React.Fragment>
    );
  }
}

const rootElement = document.querySelector("#root");
if (rootElement) {
  render(
    <Provider>
      <App />
    </Provider>,
    rootElement
  );
}
