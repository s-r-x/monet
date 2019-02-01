import { Transition } from "react-transition-group";
import TweenLite from 'gsap/TweenLite'
import { Power1 } from 'gsap/EasePack'; 

import React from 'react';

export default (Component) => {
  return (props) => (
    <Transition
      appear
      exit
      unmountOnExit
      in={props.show}
      timeout={400}
      addEndListener={ (node, done) => {
        TweenLite.fromTo(node, 0.4, 
          {
            opacity: props.show ? 0 : 1,
            ease: Power1.easeInOut,
          },
          {
            opacity: props.show ? 1 : 0,
            ease: Power1.easeIn,
            onComplete: done 
          }
        );
      }}>
      <Component {...props}/>
    </Transition>
  )
};
