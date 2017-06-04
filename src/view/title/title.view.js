import './title.view.css';

import React from 'react';

const SHADOW_COUNT = 10; // The number of diagonal steps in the border
const SHADOW_DELTA = 0.2; // The size of each step
const TITLE_TEXT = 'The Annotated Life';


function TitleView(props) {

  const shadowNames = [...Array(SHADOW_COUNT)].map(

    (_, index) => 'shadow_' + index
  );

  return (
    <div className='TitleView'>
      <svg role='img' 
           className='TitleView-svg'>
        <title>{TITLE_TEXT}</title>
        <filter id='white-border'>
          <feMorphology in='SourceGraphic' 
                        operator='dilate' 
                        radius='1' 
                        result='expand'/>

          {shadowNames.map(
        
            (name, index) => {
              
              const offset = (index + 1) * SHADOW_DELTA;

              return (
                <feOffset in='expand' 
                          dx={offset}
                          dy={offset}
                          result={name} 
                          key={index} />
              );
            }
          )}

          <feMerge result='shadow'>
            <feMergeNode in='expand'/>

            {shadowNames.map(
              (name, index) => <feMergeNode in={name} key={index} />
            )}

          </feMerge>

          <feFlood floodColor='#ebe7e0'/>
          <feComposite in2='shadow' operator='in' result='shadow'/>

          <feMorphology in='shadow' operator='dilate' radius='1' result='border'/>
          <feFlood floodColor='#35322a' result='border_color'/>
          <feComposite in2='border' operator='in' result='border'/>

          <feMerge>
            <feMergeNode in='border'/>
            <feMergeNode in='shadow'/>
            <feMergeNode in='SourceGraphic'/>
          </feMerge>
        </filter>

        <text className='TitleView-text mobile-title-text' 
              dominantBaseline='middle' 
              textAnchor='middle' 
              x='50%' 
              y='50%'>
          {TITLE_TEXT}
        </text>
      </svg>
    </div>
  );
}

export default TitleView;