import React from 'react'
import PT from 'prop-types';
import styled from 'styled-components';
import CleanButton from '../CleanButton';
import Button from '../MainButton';

const Wrap = styled.div`
  position: absolute;
  right: 50px;
  top: 50px;
  display: flex;
  flex-direction: column;
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    right: 25px;
    top: 25px;
  }
`;
const Buttons = ({ changeMode }) => (
  <Wrap>
    <Button style={{ marginBottom: '15px' }} onClick={() => changeMode('painting-info')}>Информация</Button>    
    <Button onClick={() => changeMode('bio')}>К биографии</Button>    
  </Wrap>
)
Buttons.propTypes = {
  changeMode: PT.func,
};

export default Buttons;
