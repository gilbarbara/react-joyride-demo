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
  background-color: ${theme.variants.primary['100']};
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
  const imageWidth = 1024;
  const imageHeight = 683;

  return (
    <Box align="center" display="flex" justify="center">
      <GridImages className="image-grid">
        <ImgWrapper>
          <Img
            alt="1"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?red`}
          />
        </ImgWrapper>
        <ImgWrapper>
          <Img
            alt="2"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?orange`}
          />
        </ImgWrapper>
        <ImgWrapper>
          <Img
            alt="3"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?yellow`}
          />
        </ImgWrapper>
        <ImgWrapper>
          <Img
            alt="4"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?green`}
          />
        </ImgWrapper>
        <ImgWrapper>
          <Img
            alt="5"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?blue`}
          />
        </ImgWrapper>
        <ImgWrapper>
          <Img
            alt="6"
            src={`https://source.unsplash.com/random/${imageWidth}x${imageHeight}?magenta`}
          />
        </ImgWrapper>
      </GridImages>
    </Box>
  );
}
