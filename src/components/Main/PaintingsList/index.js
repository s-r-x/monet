import React from 'react';
import Thumb from './Thumb';
import styled from 'styled-components';
import PT from 'prop-types';
import CleanButton from '../../CleanButton';
import withFancyScroll from '../../withFancyScroll';


const Wrap = withFancyScroll(styled.div`
  margin-top: 7vh;
  position: relative;
  white-space: nowrap;
  overflow-y: hidden;
  min-height: 183px;
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    min-height: 100px;
  }
  ::-webkit-scrollbar {
    width: auto;
    height: 5px;
  }
`);

const ThumbButton = styled(CleanButton)`
  display: inline-block;
  min-height: 0;
  text-align: left;
  height: auto;
`;

const thumbClickHandler = ({target}, changeActivePaintingIndex) => {
  const $btn = target.closest('[data-painting-index]');
  if(!$btn) {
    return;
  }
  const index = +$btn.dataset.paintingIndex;
  changeActivePaintingIndex(index);
}

const List = ({ paintings, changeActivePaintingIndex }) => {
  return (
  <Wrap 
    onClick={e => thumbClickHandler(e, changeActivePaintingIndex)}>
    {paintings.map(({ file, title }, index) => (
      <ThumbButton 
        key={title + Math.random()} 
        data-painting-index={index}>
        <Thumb 
          url={window.thumbsBaseUrl + file} 
          title={title}/>
      </ThumbButton>
    ))}
  </Wrap>
  )
};

List.propTypes = {
  paintings: PT.array,
  changeActivePaintingIndex: PT.func,
};

export default List;
