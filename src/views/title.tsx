import React from 'react';
import styled from 'styled-components';

const SHADOW_COUNT: number = 10; // The number of diagonal steps in the border
const SHADOW_DELTA: number = 0.2; // The size of each step
const TITLE_TEXT: string = 'The Annotated Life';

export function TitleView() {
  const shadowNames: Array<string> = [...Array(SHADOW_COUNT)].map(
    (_, index) => 'shadow_' + index
  );

  return (
    <Root>
      <TitleViewSvg role='img'>
        <title>{TITLE_TEXT}</title>
        <filter id='white-border'>
          <feMorphology
            in='SourceGraphic'
            operator='dilate'
            radius='1'
            result='expand'
          />

          {shadowNames.map((name, index) => {
            const offset = (index + 1) * SHADOW_DELTA;

            return (
              <feOffset
                in='expand'
                dx={offset}
                dy={offset}
                result={name}
                key={index}
              />
            );
          })}

          <feMerge result='shadow'>
            <feMergeNode in='expand' />

            {shadowNames.map((name, index) => (
              <feMergeNode in={name} key={index} />
            ))}
          </feMerge>

          <feFlood floodColor='#ebe7e0' />
          <feComposite in2='shadow' operator='in' result='shadow' />

          <feMorphology
            in='shadow'
            operator='dilate'
            radius='1'
            result='border'
          />
          <feFlood floodColor='#35322a' result='border_color' />
          <feComposite in2='border' operator='in' result='border' />

          <feMerge>
            <feMergeNode in='border' />
            <feMergeNode in='shadow' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>

        <TitleViewText
          className='mobile-title-text'
          dominantBaseline='middle'
          textAnchor='middle'
          x='50%'
          y='50%'
        >
          {TITLE_TEXT}
        </TitleViewText>
      </TitleViewSvg>
    </Root>
  );
}

const TitleViewSvg = styled.svg`
  width: 100%;
  height: 100%;
  vertical-align: top;
`;

const TitleViewText = styled.text`
  fill: #35322a;
  font-family: 'Cinzel Decorative', serif;
  filter: url('#white-border');
  font-weight: 900;
  font-size: 47pt;
  user-select: none;

  /* The smallish screen */
  @media all and (max-width: 850px) {
    filter: none;
    font-size: 28pt;
  }

  /* The small screen */
  @media all and (max-width: 500px) {
    filter: none;
    font-size: 19pt;
  }
`;

const Root = styled.div`
  height: 10%;
  padding: 5%;
  padding-bottom: 4%;
`;
