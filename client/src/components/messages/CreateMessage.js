import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import axios from "axios";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withStyles } from "material-ui/styles";
// import Delete from "@material-ui/icons/Delete";
// import FileUpload from "@material-ui/icons/FileUpload";
// import KeyboardVoice from "@material-ui/icons/KeyboardVoice";
import Icon from "material-ui/Icon";
// import Save from "@material-ui/icons/Save";
import Snackbar from "material-ui/Snackbar";
import Slide from "material-ui/transitions/Slide";
// import MenuItem from "material-ui/Menu/MenuItem";

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      submitted: false,
      textContent: "",
      bodyContent: "",
      transition: null,
      error: false,
      clearAllConfirmation: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    const message = {
      title: this.state.textContent,
      content: this.state.bodyContent,
      date: Date.now()
    };
    axios
      .post("/messages.json", message)
      .then(response => {
        console.log(response);
        this.setState({ submitted: true });
        setTimeout(() => {
          this.setState({ submitted: false });
        }, 4000);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
        setTimeout(() => {
          this.setState({ error: false });
        }, 4000);
      });
  };

  onChangedHandler = e => {
    this.setState({ textContent: e.target.value });
  };

  contentOnChangedHandler = e => {
    this.setState({ bodyContent: e.target.value });
  };

  handleClearAllButton = () => {
    this.setState({ clearAllConfirmation: true });
  };

  handleClearAllButtonClose = () => {
    this.setState({ clearAllConfirmation: false });
  };

  handleClearAllButtonCloseYes = () => {
    this.setState({ clearAllConfirmation: false });
    axios
      .delete("/messages.json")
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.button}
          onClick={this.handleClickOpen}
          variant="raised"
          color="primary"
        >
          New Message
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
        <Button
          className={classes.button}
          onClick={this.handleClearAllButton}
          variant="raised"
          color="secondary"
        >
          Clear All Messages
          {/* <Delete className={classes.rightIcon} /> */}
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Message</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="email"
              fullWidth
              onChange={this.onChangedHandler}
            />
            <TextField
              margin="dense"
              id="name"
              label="Content"
              type="email"
              fullWidth
              onChange={this.contentOnChangedHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.clearAllConfirmation}
          onClose={this.handleClearAllButtonClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will delete all messages stored on the server.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClearAllButtonClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClearAllButtonCloseYes} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={this.state.submitted}
          onClose={this.handleClose}
          transition={TransitionUp}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Message was successfully sent!</span>}
        />
        <Snackbar
          open={this.state.error}
          onClose={this.handleClose}
          transition={TransitionUp}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Message was not sent! Try checking your internet connection.
            </span>
          }
        />
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormDialog);
