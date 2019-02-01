import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Section from '../Section'
import Overlay from '../Overlay';
import { Row, Col } from 'reactstrap';
import NextButton from './Button';

const Hero = styled.header`
  width: 100%;
  margin-bottom: 9%;
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    margin-bottom: 15%;
  }
`;
const H1 = styled.h1`
  margin-bottom: 4px;
  font-size: 94px;
  line-height: 80px;
  font-weight: 900;
  @media(max-width: ${({theme}) => theme.breakpoints.md}px) {
    font-size: 72px;
    line-height: 67px;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    font-size: 44px;
    line-height: 48px;
  }
`
const Years = styled.span`
  line-height: 17px;
  font-size: ${({theme}) => theme.baseFontsize}px;
`;

const Head = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url(${window.imagesBaseUrl + 'portrait.jpg'});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 32%;
`;
const Quote = styled.p`
  width: 45%;
  margin-top: 25px;
  margin-bottom: 60px;
  font-style: italic;
  line-height: 22px;
  font-size: ${({theme}) => theme.baseFontsize}px;
  @media(max-width: ${({theme}) => theme.breakpoints.md}px) {
    width: 60%;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.sm}px) {
    width: 75%;
  }
  @media(max-width: ${({theme}) => theme.breakpoints.xs}px) {
    width: 95%;
  }
`
const LightenOverlay = styled(Overlay)`
  opacity: 0.3;
`;

export default class H extends PureComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <Head>
        <LightenOverlay/>
        <Hero>
          <Row>
            <Col xs={{ size: 11, offset: 1 }}>
              <H1>
                Оскар-Клод <br/>Моне 
              </H1>  
              <Years>
                1840, Париж - 1926, Живерни
              </Years>
              <Quote>
                “Люди обсуждают мое творчество и притворяются, будто понимают, как будто необходимо понимать его, а не просто любить”
              </Quote>
              <NextButton to="/youth">Далее</NextButton>
            </Col>
          </Row>
        </Hero>
      </Head>
    )
  }
}
