import React, { Component } from 'react';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS } from 'react-joyride';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
// @ts-ignore
import a11yChecker from 'a11y-checker';

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

const Heading = styled.h3`
  margin: 0;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: underline;
`;

class CarouselDemo extends Component {
  public state = {
    run: true,
    stepIndex: 0,
    steps: [
      {
        content: (
          <React.Fragment>
            <Heading>You can control external widgets</Heading>
            <h4>
              (using{' '}
              <Link
                href="https://github.com/leandrowd/react-responsive-carousel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open react-modal in a new window"
              >
                react-responsive-carousel
              </Link>
              )
            </h4>
          </React.Fragment>
        ),
        disableBeacon: true,
        target: '.app__carousel',
        textAlign: 'center',
      },
      {
        content: 'It was sunny and we were together ❤️',
        target: '.app__carousel',
        title: 'That Day',
      },
      {
        content: 'Black and white photos are really beautiful',
        target: '.app__carousel',
      },
      {
        content: "I love those babies, don't you?",
        target: '.app__carousel',
        title: 'Da pupperz!',
      },
      {
        content: 'Dark days and lonely nights',
        target: '.app__carousel',
      },
    ],
  };

  public componentDidMount() {
    a11yChecker();
  }

  private handleClickCarousel = (index: number) => {
    if (index === 0) {
      this.setState({ run: true, stepIndex: 0 });
    }
  };

  private handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    }

    // tslint:disable:no-console
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
    // tslint:enable:no-console
  };

  public render() {
    const { run, stepIndex, steps } = this.state;

    return (
      <Wrapper>
        <Joyride
          run={run}
          steps={steps}
          stepIndex={stepIndex}
          continuous={true}
          scrollToFirstStep={true}
          showSkipButton={true}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              overlayColor: 'rgba(0, 122, 122, 0.6)',
              primaryColor: '#099',
            },
          }}
        />
        <CarouselWrapper className="app__carousel">
          <Carousel
            onClickItem={this.handleClickCarousel}
            selectedItem={stepIndex}
            showArrows={!run}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
          >
            <img
              src={`https://placeimg.com/${width}/${height}/any/grayscale?1`}
              style={{ cursor: 'pointer' }}
              alt="1"
            />
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
