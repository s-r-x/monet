import styled from 'styled-components'
export default component => styled(component)`
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #555;
  }
`;
