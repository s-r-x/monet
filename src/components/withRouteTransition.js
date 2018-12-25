import { Transition } from "react-transition-group";
import TweenLite from 'gsap/TweenLite'
import React from 'react';
const startState = { autoAlpha: 0 };

export default (Component) => {
  return (props) => (
    <Transition
      appear
      exit
      unmountOnExit
      in={props.show}
      timeout={1000}
      onEnter={node => TweenLite.set(node, startState)}
      addEndListener={ (node, done) => {
        TweenLite.to(node, 1, {
          autoAlpha: props.show ? 1 : 0,
          onComplete: done
        });
      }}>
      <Component {...props}/>
    </Transition>
  )
};
