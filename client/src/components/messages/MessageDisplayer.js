import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions";
import Message from "./Messages";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1
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

class MessageDisplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesData: [],
      messagesTest: []
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
    // this.refreshMessages();
    // setInterval(() => this.refreshMessages(), 500);
  }

  refreshMessages() {
    axios
      .get("/messages.json")
      .then((response) => {
        this.setState({ messagesData: Object.values(response.data) });
        this.setState({
          messagesTest: this.state.messagesData.map(temp => (
            <Message title={temp.title} content={temp.content} date={temp.date} key={temp.date} />
          ))
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.state.messagesTest}</div>;
  }
}

MessageDisplayer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(withStyles(styles)(MessageDisplayer));
