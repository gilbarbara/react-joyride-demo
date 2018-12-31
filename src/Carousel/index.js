import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactJoyride, { ACTIONS, EVENTS } from "react-joyride";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const isPortrait = window.innerHeight > window.innerWidth;
const height = isPortrait ? 700 : 300;
const width = 1000;
const ratio = width / height;

const Wrapper = styled.div`
  background-color: #ccc;
  height: 100vh;
  width: 100vw;
`;

const CarouselWrapper = styled.div`
  display: flex;
  height: ${window.innerWidth / ratio}px;
`;

class CarouselDemo extends Component {
  state = {
    continuous: true,
    run: true,
    steps: [
      {
        content: "Our awesome projects",
        target: ".app__carousel",
        textAlign: "center"
      },
      {
        content:
          "Can be advanced by clicking an element through the overlay hole.",
        disableCloseOnEsc: true,
        disableOverlayClicks: true,
        target: ".app__carousel",
        title: "Our Mission"
      },
      {
        content: "This step tests what happens when a target is missing",
        target: ".app__carousel",
        title: "Unmounted target"
      },
      {
        content: (
          <div>
            <h3>We are the people</h3>
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
        target: ".app__carousel"
      },
      {
        content:
          "Text only steps — Because sometimes you don't really need a proper heading",
        target: ".app__carousel"
      }
    ],
    stepIndex: 0,
    tooltipOptions: {
      wrapperOptions: {
        offset: -5
      }
    }
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
    const { action, index, type } = data;
    let stepIndex = this.state.stepIndex;

    if (type === EVENTS.STEP_AFTER) {
      // Update state to advance the tour
      stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      stepIndex = index + 1;
    } else if (type === EVENTS.TARGET_NOT_FOUND) {
      stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
    }

    this.setState({ stepIndex });

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  render() {
    const joyrideProps = {
      ...this.state,
      ...this.props.joyride
    };

    return (
      <Wrapper>
        <ReactJoyride
          scrollToFirstStep
          showSkipButton
          {...joyrideProps}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: "#099",
              overlayColor: "rgba(0, 122, 122, 0.6)"
            }
          }}
        />
        <CarouselWrapper className="app__carousel">
          <Carousel
            style={{ height: "60vh" }}
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            selectedItem={joyrideProps.stepIndex}
          >
            <img
              src={`https://placeimg.com/${width}/${height}/any/grayscale?1`}
              alt="1"
            />
            <img
              src={`https://placeimg.com/${width}/${height}/any/grayscale?2`}
              alt="2"
            />
            <img
              src={`https://placeimg.com/${width}/${height}/any/grayscale?3`}
              alt="3"
            />
            <img
              src={`https://placeimg.com/${width}/${height}/any/grayscale?4`}
              alt="4"
            />
            <img
              src={`https://placeimg.com/${width}/${height}/any/grayscale?5`}
              alt="5"
            />
          </Carousel>
        </CarouselWrapper>
      </Wrapper>
    );
  }
}

export default CarouselDemo;
