import React from 'react'
import styled from 'styled-components';
import CleanButton from '../CleanButton';
import PT from 'prop-types';

const TopButton = styled(CleanButton)`
  font-size: 24px;
  margin: 0 30px;
  transition: opacity .35s ease-out;
  :hover {
    opacity: 0.8;
  }
  color: ${({ mode }) => mode === 'painting' ? 'black' : 'white'};
  @media(max-width: ${({theme}) => theme.breakpoints.md}px) {
    font-size: 16px;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    margin: 10px 0;
  }
`
const Wrap = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 50px;
  justify-content: flex-end;
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    justify-content: space-around;
    padding: 25px 10px;
  }
`;

const Buttons = ({ mode, changeViewMode }) => (
  <Wrap>
    {mode === 'bio' && <TopButton mode={mode} onClick={() => changeViewMode('painting')}>
      Посмотреть картину
    </TopButton>
    }
    {mode === 'painting-info' && <TopButton mode={mode} onClick={() => changeViewMode('painting')}>
      Скрыть информацию
    </TopButton>
    }
    {mode === 'painting' && <TopButton mode={mode} onClick={() => changeViewMode('painting-info')}>
      Показать информацию 
    </TopButton>
    }
    {mode !== 'bio' && <TopButton mode={mode} onClick={() => changeViewMode('bio')}>
      К биографии
    </TopButton>
    }
  </Wrap>
);
Buttons.propTypes = {
  mode: PT.string,
  changeViewMode: PT.func,
}

export default Buttons;
