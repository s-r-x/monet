import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Section from '../Section';
import Overlay from '../Overlay'; 
import PaintingInfo from './Painting/Info';
import Canvas from './Painting/Canvas';
import bioDict from '../../content/bio';
import paintingsDict from '../../content/paintings';
import withTransition from '../withTransition';
import BioDetails from './Bio/Details';
import TopButtons from './TopButtons';

const TransitionPaintingInfo = withTransition(PaintingInfo);
const TransitionBioDetails = withTransition(BioDetails);

const EnhancedSection = styled(Section)`
  display: flex;
  flex-direction: column;
`;
const EnhancedOverlay = styled(Overlay)`
  opacity: ${({mode}) => mode === 'painting' ? 0 : ''};      
`;

export default class Bio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePaintingIndex: 0, 
      mode: 'bio',
    };
    this.sectionRef = React.createRef();
    this.changeViewMode = this.changeViewMode.bind(this);
    this.changeActivePaintingIndex = this.changeActivePaintingIndex.bind(this);
    this.pageLoadListener = this.pageLoadListener.bind(this);
  }
  changeViewMode(mode) {
    this.setState({ mode });
  }
  componentWillUnmount() {
    window.removeEventListener('load', this.pageLoadListener);
  }
  pageLoadListener() {
    //const { index } = this.props;  
    // preload first image of every other route
    // to prevent ugly stuttering on load 
    // is it worth it??
    //const loadImage = src => new Promise((resolve) => {
    //  const image = new Image();
    //  image.src = src;
    //  image.onload = resolve;
    //})
    //paintingsDict.forEach(async (paintings, i) => {
    //  if(i === index) {
    //    return;
    //  }
    //  const url = window.paintingsBaseUrl + paintings[0].file;
    //  // load images sequentially, not parallel
    //  await loadImage(url);
    //});
  }
  async componentDidMount() {
    window.addEventListener('load', this.pageLoadListener);
  }
  changeActivePaintingIndex(index) {
    this.setState({ activePaintingIndex: index });
  }
  render() {
    let activePeriodIndex = this.props.index;
    const paintings = paintingsDict[activePeriodIndex];
    const { activePaintingIndex, mode } = this.state;
    const activePainting = paintings[activePaintingIndex];
    return (
      <EnhancedSection ref={this.sectionRef}>
        { activePainting && 
          <Canvas
            mode={mode}
            url={window.paintingsBaseUrl + activePainting.file}/>
        }
        {mode === 'painting' && <TopButtons changeMode={this.changeViewMode}/>}
        <EnhancedOverlay mode={mode}/>
        <TransitionPaintingInfo
          paintingIndex={activePaintingIndex}
          changeActivePaintingIndex={this.changeActivePaintingIndex} 
          paintingsLength={paintings.length}
          changeMode={this.changeViewMode}
          painting={activePainting}
          show={mode === 'painting-info'}/>
        <TransitionBioDetails
          activePeriodIndex={activePeriodIndex}
          show={mode === 'bio'}
          changeMode={this.changeViewMode}
          changeActivePaintingIndex={this.changeActivePaintingIndex}
          bio={bioDict[activePeriodIndex]}
          paintings={paintings}
        />
      </EnhancedSection>
    );
  }
}
