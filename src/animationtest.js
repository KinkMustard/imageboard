/* eslint-env browser */
import React from "react";
import ReactDOM from "react-dom";
import anime from "animejs";
import Radium from "radium";
import "./Assets/css/style.min.css";

let nice;
let onBegan = false;
let offBegan = false;
let completed = true;

class Buttons extends React.Component {
  On() {
    if (onBegan === false && completed === true) {
      onBegan = true;
      nice = anime({
        targets: ".block",
        translateX(el, i) {
          return 300 + 400 * i;
        },
        translateY(el, i) {
          return 10 + 400 * i;
        },
        backgroundColor: [
          { value: "#7C4DFF" },
          { value: "#E040FB" },
          { value: "#f44336" }
        ],
        easing: "easeInOutQuad",
        rotate: "+=2turn",
        width: {
          value: "+=250",
          easing: "easeInOutSine"
        },
        height: {
          value: "+=340",
          easing: "easeInOutSine"
        },
        delay(el, i, l) {
          return i * 300;
        },
        complete() {
          completed = false;
          onBegan = false;
        }
      });
    }
  }

  Off() {
    if (offBegan === false && completed === false) {
      offBegan = true;
      nice = anime({
        targets: ".block",
        translateX: 0,
        // translateY(el, i) {
        //   return 50 + 500 * i * -1;
        // },
        translateY: 0,
        backgroundColor: [
          { value: "#f44336" },
          { value: "#E040FB" },
          { value: "#7C4DFF" }
        ],
        easing: "linear",
        rotate: "-=2turn",
        width: {
          value: "-=250",
          easing: "easeInOutSine"
        },
        height: {
          value: "-=340",
          easing: "easeInOutSine"
        },
        delay(el, i, l) {
          return i * 300;
        },
        complete() {
          completed = true;
          offBegan = false;
        }
      });
    }
  }

  render() {
    const borderColor = {
      borderColor: this.props.borderColor,
      color: this.props.borderColor,
      ":hover": {
        backgroundColor: this.props.borderColor,
        color: "#212529"
      },
      ":focus": {
        boxShadow: "none"
      }
    };
    return (
      <div>
        <button
          type="button"
          className="btn"
          style={borderColor}
          key={1}
          onClick={this.On}
        >
          On
        </button>
        <button
          type="button"
          className="btn"
          style={borderColor}
          key={2}
          onClick={this.Off}
        >
          Off
        </button>
      </div>
    );
  }
}

Buttons = Radium(Buttons);

class LineAnimation extends React.Component {
  componentDidMount() {
    const lineDrawing = anime({
      targets: "#lineDrawing .lines path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay(el, i) {
        return i * 250;
      },
      direction: "alternate",
      loop: true
    });
  }
  render() {
    return (
      <div id="lineDrawing">
        {" "}
        <svg viewBox="0 0 580 500">
          <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeWidth="1"
            className="lines"
          >
            <path
              d="M 0 0 Q 150 50 100 100 Q 250 550 50 200 Q 350 50 200 200 C 450 550 450 50 50 150 C 550 50 550 550 150 250 A 50 50 0 1 1 600 200  "
              strokeDasharray="316.8546142578125"
              style={{ strokeDashoffset: "316.271px" }}
            />
          </g>
        </svg>{" "}
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <Buttons borderColor="#FF1461" />nice meme
        <div className="block" />
        <div style={{ height: "10px" }} />
        <div className="block" />
        <div style={{ height: "10px" }} />
        <div className="block" />
        <LineAnimation />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
