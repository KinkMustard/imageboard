import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import io from "socket.io-client";

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles, MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Button from "material-ui/Button";
import purple from "material-ui/colors/purple";
import green from "material-ui/colors/green";

const endPoint = "http://192.168.1.97:5000";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  },
  bootstrapRoot: {
    boxShadow: "none",
    textTransform: "none",
    borderRadius: 4,
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

class ColorController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "white",
      socket: null
    };
  }
  componentWillMount() {
    this.initSocket();
  }
  initSocket = async () => {
    const socket = io(endPoint);
    socket.on("connect", () => {
      console.log("connected");
    });
    await this.setState({ socket });
    await this.getColor();
  };
  getColor = async color => {
    const { socket } = this.state;
    socket.on("get color", color => {
      console.log(color);
      this.setState({ color });
    });
  };
  setColor = async color => {
    const { socket } = this.state;
    await this.setState({ color });
    console.log(this.state.color);
    socket.emit("change color", this.state.color);
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{ backgroundColor: this.state.color }}>
          <Button id="blue" variant="raised" color="primary" onClick={() => this.setColor("blue")}>
            Blue
          </Button>
          <Button id="red" variant="raised" color="primary" onClick={() => this.setColor("red")}>
            Red
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

ColorController.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorController);
