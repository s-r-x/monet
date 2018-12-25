import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.overlay.bgc};
  opacity: ${({theme}) => theme.overlay.opacity};
  transition: opacity .3s ease-in;
  pointer-events: none;
`;

export default Overlay;
