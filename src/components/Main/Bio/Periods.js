import React from 'react';
import styled from 'styled-components';
import PT from 'prop-types';
import periodsList from '../../../periodsList';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    display: none;
  }
`;
const Li = styled.li`
  margin-bottom: 4.5vh;
  opacity: 0.5;
  font-size: 18px;
  transition: opacity .35s ease-out;
  :last-child {
    margin-bottom: 0;
  }
  :hover {
    opacity: 0.8;
  }
`;
const ActiveLi = styled(Li)`
  position: relative;
  opacity: 1 !important;
  :before {
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    left: -18px;
    top: 6px;
    background-color: ${({theme}) => theme.textColor};
  }
`

const List = ({ activePeriodIndex }) => (
  <Ul>
    {periodsList.map(({ index, text}) => {
      const isActive = index == activePeriodIndex;
      const key = text + Math.random();
      const routes = [
        '/youth', '/begin', '/impr', '/giverny',
      ];
      const to = routes[index];
      const link = <Link style={{color: 'inherit', textDecoration: 'none' }} to={to}>{text}</Link>;
      if(isActive) {
        return <ActiveLi key={key} data-period={index}>{link}</ActiveLi> 
      }
      else {
        return <Li key={key} data-period={index}>{link}</Li>;
      }
    })}
  </Ul>
);
List.propTypes = {
  activePeriodIndex: PT.string,
};

export default List;
