import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

import About from "./About";
import Hero from "./Hero";
import Mission from "./Mission";
import Projects from "./Projects";

import "./styles.css";

class Controlled extends Component {
  state = {
    continuous: true,
    loading: false,
    run: false,
    steps: [
      {
        content: "These are our super awesome projects!",
        textAlign: "center",
        target: ".projects .list",
        placement: "bottom",
        placementBeacon: "top",
        styles: {
          options: {
            zIndex: 10000
          }
        },
        title: "The projects"
      },
      {
        title: "Our Mission",
        content: (
          <div>
            You can interact with your own components through the spotlight.
            <br />
            Click in the Advance button above.
          </div>
        ),
        target: ".mission button",
        placement: "bottom",
        spotlightClicks: true,
        styles: {
          tooltipFooter: {
            opacity: 0
          },
          buttonClose: {
            display: "none"
          }
        }
      },
      {
        content: (
          <div>
            <svg
              width="96px"
              height="96px"
              viewBox="0 0 96 96"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        placement: "right",
        target: ".about h2 span",
        title: "We are the people"
      },
      {
        content: "Because sometimes you don't really need a proper heading",
        target: ".demo__footer button",
        placement: "top"
      }
    ],
    stepIndex: 0
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  handleClickStart = e => {
    e.preventDefault();

    this.setState({
      run: true,
      stepIndex: 0
    });
  };

  handleClickNextButton = () => {
    const { stepIndex } = this.state;

    if (this.state.stepIndex === 1) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  };

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { action, index, type, status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status) && this.state.run) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    } else if (type === EVENTS.STEP_AFTER && index === 0) {
      this.setState({ run: false, loading: true });

      setTimeout(() => {
        this.setState({
          loading: false,
          run: true,
          stepIndex: index + (action === ACTIONS.PREV ? -1 : 1)
        });
      }, 2000);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      this.setState({ stepIndex: index + 1 });
    }

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  render() {
    const { loading, ...joyrideProps } = this.state;
    const props = {
      ...joyrideProps,
      ...this.props.joyride
    };

    return (
      <div className="demo-wrapper">
        <ReactJoyride
          scrollToFirstStep
          showProgress
          showSkipButton
          {...props}
          callback={this.handleJoyrideCallback}
        />
        <Hero onClick={this.handleClickStart} />
        <Projects />
        <Mission
          onClick={this.handleClickNextButton}
          style={{ opacity: props.stepIndex === 1 ? 1 : 0 }}
        />
        <About />
        {loading && (
          <div className="loading">
            The tour is paused while your app loads some asynchronous function
            or change routes...
          </div>
        )}
      </div>
    );
  }
}

export default Controlled;
