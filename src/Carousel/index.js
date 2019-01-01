import React, { Component } from 'react';
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
    run: true,
    steps: [
      {
        target: '.app__carousel',
        content: 'This is an amazing photo',
        textAlign: 'center',
        disableBeacon: true,
      },
      {
        target: '.app__carousel',
        content: 'It was sunny and we were together ❤️',
        title: 'That Day'
      },
      {
        target: '.app__carousel',
        content: 'Black and white photos are really beautiful',
      },
      {
        target: '.app__carousel',
        content: 'I love those babies, don\'t you?',
        title: 'Da pupperz!',
      },
      {
        target: '.app__carousel',
        content: 'Dark days and lonely nights',
      }
    ],
    stepIndex: 0,
  };

  handleClickCarousel = (index) => {
    if (index === 0) {
      this.setState({ run: true, stepIndex: 0 });
    }
  };

  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  render() {
    const { run, stepIndex, steps } = this.state;

    return (
      <Wrapper>
        <ReactJoyride
          run={run}
          steps={steps}
          stepIndex={stepIndex}
          continuous
          scrollToFirstStep
          showSkipButton
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#099',
              overlayColor: 'rgba(0, 122, 122, 0.6)',
            }
          }}
        />
        <CarouselWrapper className="app__carousel">
          <Carousel
            style={{ height: '60vh' }}
            selectedItem={stepIndex}
            showArrows={!run}
            onClickItem={this.handleClickCarousel}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
          >
            <img src={`https://placeimg.com/${width}/${height}/any/grayscale?1`} onClick={this.handleClickStart} style={{ cursor: 'pointer' }} alt="1" />
            <img src={`https://placeimg.com/${width}/${height}/any/grayscale?2`} alt="2" />
            <img src={`https://placeimg.com/${width}/${height}/any/grayscale?3`} alt="3" />
            <img src={`https://placeimg.com/${width}/${height}/any/grayscale?4`} alt="4" />
            <img src={`https://placeimg.com/${width}/${height}/any/grayscale?5`} alt="5" />
          </Carousel>
        </CarouselWrapper>
      </Wrapper>
    );
  }
}

export default CarouselDemo;
