import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import arrowRight from './arrow-right.svg';
import arrowLeft from './arrow-left.svg';
import PT from 'prop-types';
import CleanButton from '../../CleanButton';
import withFancyScroll from '../../withFancyScroll';
import { TimelineMax } from 'gsap';
import { Power1 } from 'gsap';

const Title = styled.h2`
  font-size: 94px;
  line-height: 75px;
  font-weight: 900;
  max-width: 55%;
  margin-bottom: 10px;
  @media(max-width: ${({theme}) => theme.breakpoints.lg}px) {
    font-size: 80px;
    line-height: 65px;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.md}px) {
    max-width: 65%;
    font-size: 72px;
    line-height: 60px;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    max-width: 80%;
    font-size: 60px;
    line-height: 55px;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    max-width: 100%;
    font-size: 42px;
    line-height: 40px;
  }
  @media(max-width: 340px) {
    font-size: 32px;
    line-height: 35px;
  }
`;
const Year = styled.span`
  display: block;
  font-size: 24px;
  font-style: italic;
  @media(max-width: 340px) {
    font-size: 22px;
  }
`;
const Desc = withFancyScroll(styled.p`
  font-size: 17px;
  line-height: 30px;
  font-style: italic;
  max-width: 50%;
  padding-right: 5px;
  max-height: 20vh;
  overflow: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  @media(max-width: ${({theme}) => theme.breakpoints.lg}px) {
    max-width: 60%;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.md}px) {
    max-width: 70%;
    max-height: 35vh;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    max-width: 80%;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    max-width: 100%;
    max-height: 40vh;
    margin-bottom: 30px;
  }
`);
const EnhancedRow = styled(Row)`
  padding-top: 100px;
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
  align-items: flex-end;
  overflow: auto;
  padding-bottom: 7vh;
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    padding-bottom: 4vh;
  }
`;
const CurrentIndex = styled.span`
  margin: 0 10px;
  font-style: italic;
`;

const NavButtons = styled.div``;

const NavButtons2 = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  button {
    font-size: 16px;
    transition: opacity .35s ease-out;
    :hover {
      opacity: 0.6;
    }
  }
`;

class PaintingInfo extends PureComponent {
  constructor() {
    super();
    this.titleRef = React.createRef();
    this.descRef = React.createRef();
    this.yearRef = React.createRef();
  }
  componentDidMount() {
    this.animate();
  }
  componentDidUpdate(prevProps) {
    if(this.props.painting === prevProps.painting) {
      return;
    }
    this.animate();
  }
  animate() {
    const $title = this.titleRef.current;
    const $desc = this.descRef.current;
    const $year = this.yearRef.current;
    const tl = new TimelineMax();
    const from = {
      opacity: 0,
      x: -50,
      ease: Power1.easeInOut,

    };
    const to = {
      opacity: 1,
      x: 0, 
      ease: Power1.easeInOut,
    }
    tl.fromTo($title, 0.5, from, to)
      .fromTo($year, 0.5, from, to, 0.2)
      .fromTo($desc, 0.5, from, to, 0.4)

  }
  render() {
    const { painting, paintingIndex, changeActivePaintingIndex, paintingsLength, changeMode } = this.props;
    return (
      <EnhancedRow>
        <Col xs={{offset: 1, size: 11}}>
          <Title ref={this.titleRef}>
            {painting.title} 
          </Title>
          <Year ref={this.yearRef}>
            {painting.year}
          </Year>
          <Desc ref={this.descRef}>
            {painting.desc}
          </Desc>
          <NavButtons>
            {paintingIndex > 0 && 
                <CleanButton 
                  aria-label="Предыдущая картина" 
                  onClick={() => changeActivePaintingIndex(paintingIndex - 1)}>
                  <img src={arrowLeft} alt="" />
                </CleanButton>
            }
            <CurrentIndex>
              {paintingIndex+1}/{paintingsLength}
            </CurrentIndex>
            {paintingIndex < paintingsLength-1 &&
                <CleanButton 
                  aria-label="Следующая картина" 
                  onClick={() => changeActivePaintingIndex(paintingIndex +1)}>
                  <img src={arrowRight} alt="" />
                </CleanButton>
            }
          </NavButtons>
          <NavButtons2>
            <CleanButton onClick={() => changeMode('painting')}>Посмотреть картину</CleanButton>
            <CleanButton onClick={() => changeMode('bio')}>К биографии</CleanButton>
          </NavButtons2>
        </Col>
      </EnhancedRow>

    )
  }
}
PaintingInfo.propTypes = {
  painting: PT.object,
  changeActivePaintingIndex: PT.func,
  chageMode: PT.func,
  paintingsLength: PT.number,
  paintingIndex: PT.number,
};

export default PaintingInfo;
