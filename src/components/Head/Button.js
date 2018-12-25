import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  font-size: 16px;
  border-radius: 27px;
  letter-spacing: 0.5px;
  background-color: #fff;
  color: #000;
  font-weight: 400;
  padding: 6px 31px;
  border: 2px solid #fff;
  text-decoration: none;
  outline: none;
  transition: opacity .35s ease-out;
  :hover, :focus {
    opacity: 0.7;
  }
`;
