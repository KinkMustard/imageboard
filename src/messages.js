import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Delete from "@material-ui/icons/Delete";
import { withStyles } from "material-ui/styles";
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import Grow from "material-ui/transitions/Grow";
import { Divider } from "material-ui";
import axios from "./axios-instance";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growAnimation: false
    };
  }

  componentDidMount() {
    this.setState({ growAnimation: true });
  }

  handleDelete = () => {
    axios.delete("/messages.json");
  };
  render() {
    const { classes } = this.props;
    const { growAnimation } = this.state;

    return (
      <Grow
        in={growAnimation}
        style={{ transformOrigin: "0 0 0" }}
        {...(growAnimation ? { timeout: 1000 } : {})}
      >
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.props.title}</Typography>
            <Typography className={classes.secondaryHeading}>
              {moment(this.props.date).fromNow()}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{this.props.content}</Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button
              className={classes.button}
              onClick={this.handleDelete}
              variant="raised"
              color="secondary"
            >
              Delete
              <Delete className={classes.rightIcon} />
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </Grow>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
