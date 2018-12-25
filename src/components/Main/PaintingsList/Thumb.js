import React from 'react';
import styled from 'styled-components';

const Thumb = styled.figure`
  margin: 0 20px 30px 20px;
  width: 128px;
  overflow: hidden;
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    width: 96px;
    margin: 0 15px 20px 15px;
  }
  img {
    width: 100%;
    height: 128px;
    object-fit: cover;
    @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
      height: 96px;
    }
  }
  figcaption {
    white-space: nowrap; 
  }
`;


export default ({ url, title }) => (
  <Thumb title={title}>
    <img src={url} alt={title}/>
    <figcaption>{title}</figcaption>
  </Thumb>
);
