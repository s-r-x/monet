import React from 'react'
import styled from 'styled-components';
import PT from 'prop-types';
import withFancyScroll from '../../withFancyScroll';

const Paragraph = withFancyScroll(styled.p`
  font-size: 17px;
  min-height: 1px;
  max-height: 100%;
  padding-right: 30px;
  font-style: italic; 
  line-height: 30px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    padding-right: 5px;
  }
`);

const Text = ({ bio }) => (
    <Paragraph>
      {bio} 
    </Paragraph>
)
Text.propTypes = {
  bio: PT.string,
};

export default Text;
