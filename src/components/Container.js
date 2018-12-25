import React, { PureComponent } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';

const Wrap = styled(Container)`
  position: relative;
  max-width: ${({theme}) => theme.maxWidth};
  height: 100vh;
  font-family: ${({theme}) => theme.font};
  color: ${({theme}) => theme.textColor};
  padding: 0;
  overflow: hidden;
`;

class MainContainer extends PureComponent {
  render() {
    return (
      <Wrap id="main-container">
        {this.props.children} 
      </Wrap>
    )
  }
}

export default MainContainer;
