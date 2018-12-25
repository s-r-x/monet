import React, { PureComponent } from 'react';
import Paintings from '../PaintingsList/index';
import { Col, Row } from 'reactstrap';
import Periods from './Periods';
import Text from './Text';
import styled from 'styled-components';

const Wrap = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%; 
  display: flex; 
  flex-direction: column; 
  padding-top: 100px;
`;

export default class BioDetails extends PureComponent {
  render() {
    const { paintings, changeActivePaintingIndex, bio, activePeriodIndex } = this.props;
    const { content, years } = bio;
    return (
      <Wrap>
        <Paintings paintings={paintings} changeActivePaintingIndex={changeActivePaintingIndex}/>
        <Row style={{marginTop: '7vh', marginBottom: '15px'}}>
          <Col 
            xl={{offset: 4, size: 8}} 
            sm={{offset: 5, size: 7}}
            xs={{offset: 1, size: 11}}
          >
            <span style={{ fontWeight: '900', fontSize: '40px', fontStyle: 'italic'}}>{years}</span>
          </Col>
        </Row>
        <Row style={{flex: 1, minHeight: 0}}>
          <Col 
            xl={{size: 2, offset: 1}} 
            sm={{ size: 3, offset: 1}}
          >
            <Periods activePeriodIndex={activePeriodIndex}/>
          </Col>
          <Col 
            style={{ height: '100%' }}
            xl={{size: 5, offset: 1}} 
            lg={{size: 6, offset: 1}}
            md={{offset: 1, size: 6}}
            sm={{offset: 1, size: 7}}
            xs={{offset: 1, size: 11}}
          >
            <Text bio={content}/>
          </Col>
        </Row>
      </Wrap>
    )
  }
}
