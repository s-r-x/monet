import React, { PureComponent } from 'react'
import TimelineLite from 'gsap/TimelineLite';                                                                                                                          
import { Power2 } from 'gsap/EasePack';
import PT from 'prop-types';
import styled from 'styled-components';
import { Application, loader, Sprite, filters, WRAP_MODES } from 'pixi.js';
const Viewport = require('pixi-viewport');

const PixiLoader = loader.__proto__.constructor;

const filterLoader = new PixiLoader();

// there is no time to explain - 
// cache all loaded pixi assets here instead of pixi loader
const assets = {};
// animation variables
const time = 1;
const ease = Power2.easeOut;


const Canvas = styled.canvas`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: grab !important;
`;


class Painting extends PureComponent {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.resize = this.resize.bind(this);
    this.viewportEvents = [ 'drag', 'pinch', 'wheel', 'decelerate' ];
    this.activeImage = null;
    this.loader = new PixiLoader();

    this.state = {
      isLoading: false,
    }
  }
  async componentDidMount() {
    this.$container = document.getElementById('main-container');
    const $canvas = this.canvasRef.current;
    const app = new Application({ 
      view: $canvas,
      transparent: true,
    });
    this.pixi = app;
    await this.loadFilter();

    // timeline for image load animation
    const tl = new TimelineLite();
    tl.pause();
    const filter = this.displacementFilter;
    filter.padding = 0;
    this.loadingTl = tl;
    tl.to(filter.scale, 70, { x: 3000, y: 600, ease: 'linear'})
    this.initViewport();
    app.stage.addChild(this.viewport);
    this.pauseEvents();
    this.changeImage();
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.pixi.destroy();
  }
  loadFilter() {
    return new Promise((resolve) => {
      const url = window.imagesBaseUrl + 'clouds.jpg';
      const cb = () => {
        const sprite = new Sprite(filterLoader.resources['filter'].texture);
        const filter = new filters.DisplacementFilter(sprite);
        this.displacementFilter = filter;
        filter.scale.x = 0;
        filter.scale.y = 0;
        filter.autoFit = true;
        const width = this.$container.clientWidth;
        const height = this.$container.clientHeight;
        sprite.anchor.set(0.5);
        sprite.position.set(width / 2, height / 2);
        sprite.scale.x = 2;
        sprite.scale.y = 2;
        sprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
        this.pixi.stage.filters = [filter];
        this.pixi.stage.addChild(sprite);
        resolve();
      }
      if(filterLoader.resources['filter']) {
        return cb();
      }
      filterLoader.add('filter', url);
      filterLoader.load(cb);
    });

  }
  pauseEvents() {
    this.viewportEvents.forEach(event => this.viewport.pausePlugin(event));
  }
  resumeEvents() {
    this.viewportEvents.forEach(event => this.viewport.resumePlugin(event));
  }
  componentDidUpdate(prevProps, prevState) { 
    const { mode } = this.props;
    const { isLoading } = this.state;
    if(prevProps.mode !== mode) {
      // leaving...
      if(prevProps.mode === 'painting') {
        this.viewport.snap(0, 0, { topLeft: true, removeOnComplete: true });
        this.resize();
        this.pauseEvents();
      }
      else if(mode === 'painting') {
        this.resumeEvents();
      }
    }
    if(prevProps.url !== this.props.url) {
      this.changeImage();
    }
    if(prevState.isLoading !== isLoading) {
      if(isLoading) {
        this.loadingTl.play();
      }
      else {
        this.loadingTl.seek(0);
        this.loadingTl.pause();
      }
    }
  }
  // pixi loader is such a pain in the ass
  // need to create new loader instance everytime
  // you need to add new asset while loading another
  // TODO:: refactor
  changeImage() {
    const { url } = this.props;
    const onload = () => {
      this.setState({ isLoading: false });
      const { viewport } = this;
      if(!assets[url] && this.loader.resources[url]) {
        assets[url] = this.loader.resources[url];
      }
      const texture = assets[url].texture;
      this.paintingTexture = texture;
      const sprite = new Sprite(texture);
      this.paintingSprite = sprite;
      const filter = this.displacementFilter;
      sprite.alpha = 0;
      viewport.addChild(sprite);
      const { activeImage } = this;
      const tl = new TimelineLite();
      this.resize();
      if(!activeImage) {
        tl.to(sprite, time, { alpha: 1 });  
      }
      else {
        tl.to(activeImage, time, { alpha: 0, ease })
          .to(filter.scale, time / 2, { x: 600, y: 400, ease: 'linear' }, 0)
          .to(filter.scale, time / 2, { x: 0, y: 0, ease: 'linear' }, time / 2)
          .to(sprite, time, { alpha: 1, ease }, 0);
      }
      this.activeImage = sprite;
      this.loader = new PixiLoader();
    };
    if(url in assets) {
      return onload();
    }
    else {
      if(this.loader.loading) {
        this.loader.reset();
      }
      this.setState({ isLoading: true });
      this.loader = new PixiLoader();
      this.loader.add(url, url);
      this.loader.load(onload);
    }
  }

  resize() {
    const $container = this.$container;
    const containerWidth = $container.clientWidth;
    const containerHeight = $container.clientHeight;
    const { paintingTexture: painting, viewport, paintingSprite } = this;
    if(!painting || !paintingSprite) {
      return;
    }

    // https://stackoverflow.com/questions/10285134/whats-the-math-behind-csss-background-sizecover
    const originalRatios = {
      width: containerWidth / painting.width,
      height: containerHeight / painting.height
    };
    const coverRatio = Math.max(originalRatios.width, originalRatios.height); 
    paintingSprite.scale.set(coverRatio, coverRatio);

    this.pixi.renderer.resize(containerWidth, containerHeight);  
    viewport.resize(containerWidth, containerHeight, paintingSprite.width, paintingSprite.height);
    // back to default scale
    viewport.scale.x = 1;
    viewport.scale.y = 1;
  }
  initViewport() {
    const viewport = new Viewport({
      interaction: this.pixi.renderer.interaction 
    });
    this.viewport = viewport;
    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();
  }
  render() {
    return <Canvas ref={this.canvasRef}/>
  }
}
Painting.propTypes = {
  url: PT.string,
  mode: PT.string,
}


export default Painting
