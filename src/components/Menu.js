import React, { PureComponent } from 'react';
import 'hamburgers/dist/hamburgers.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TweenLite from 'gsap/TweenLite'
import { Power1 } from 'gsap/EasePack'; 

const Wrap = styled.nav`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    padding: 25px;
    display: none;
    @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
      display: block;
    }
`;

const Button = ({ isOpen, onClick }) => {
  const cssClass = ['hamburger', 'hamburger--collapse', isOpen ? 'is-active' : null].filter(Boolean).join(' ');
  return (
    <button 
      onClick={onClick}
      style={{padding: 0, zIndex: 100, position: 'absolute' }}
      className={cssClass} 
      type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>  
  )
};
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background-color: ${({ theme }) => theme.menuBgc};
`;
const Li = styled.li`
  margin: 10px;
`
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.menuColor};
  text-decoration: none;
  white-space: nowrap;
  transition: opacity .35s ease;
  :hover {
    opacity: 0.5;
  }
`;

export default class extends PureComponent {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.ulRef = React.createRef();
  }
  componentDidMount() {
    const $ul = this.ulRef.current;
    TweenLite.set($ul, { opacity: 0, x: '-100%' });
  }
  componentDidUpdate(_, prevState) {
    const { isOpen } = this.state;
    if(isOpen === prevState.isOpen) {
      return;
    }
    const $ul = this.ulRef.current;
    if(isOpen) {
      TweenLite.to($ul, 0.5, { opacity: 1, x: '0%', ease: Power1.easeInOut });
    }
    else {
      TweenLite.to($ul, 0.5, { opacity: 0, x: '-100%', ease: Power1.easeInOut });
    }
  }
  clickHandler() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }
  render() {
    const { isOpen } = this.state;
    return (
      <Wrap>
        <Button isOpen={isOpen} onClick={this.clickHandler}/>
        <Ul onClick={this.clickHandler} ref={this.ulRef}>
          <Li>
            <StyledLink to="/youth">Детство и юность</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/begin">Начало творчества</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/impr">Импрессионизм</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/giverny">Жизнь в Живерни</StyledLink>
          </Li>
        </Ul>
      </Wrap>

    )
  }
}
