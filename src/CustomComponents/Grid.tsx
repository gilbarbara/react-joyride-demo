import styled from '@emotion/styled';
import { Box, theme } from '@gilbarbara/components';

const GridImages = styled.div`
  box-sizing: border-box;
  color: #444;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(1, 1fr);
  padding: 30px;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ImgWrapper = styled.div`
  background-color: ${theme.variants.primary.lightest.bg};
  padding-bottom: calc(100% / 1.5);
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  left: 0;
  max-width: 100%;
  position: absolute;
  top: 0;
`;

export default function Grid() {
  return (
    <Box align="center" display="flex" justify="center">
      <GridImages className="image-grid">
        <ImgWrapper>
          <Img alt="1" src="https://placeimg.com/1024/683/people/grayscale?1" />
        </ImgWrapper>
        <ImgWrapper>
          <Img alt="2" src="https://placeimg.com/1024/683/people/grayscale?2" />
        </ImgWrapper>
        <ImgWrapper>
          <Img alt="3" src="https://placeimg.com/1024/683/people/grayscale?3" />
        </ImgWrapper>
        <ImgWrapper>
          <Img alt="4" src="https://placeimg.com/1024/683/people/grayscale?4" />
        </ImgWrapper>
        <ImgWrapper>
          <Img alt="5" src="https://placeimg.com/1024/683/people/grayscale?5" />
        </ImgWrapper>
        <ImgWrapper>
          <Img alt="6" src="https://placeimg.com/1024/683/people/grayscale?6" />
        </ImgWrapper>
      </GridImages>
    </Box>
  );
}
