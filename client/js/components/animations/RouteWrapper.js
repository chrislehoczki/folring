import React, { Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';

// function that takes children as argument
const Transition = ({children}) => {

  const willLeave = () => ({
    opacity: spring(0),
  });

  const willEnter = () => ({
    opacity: 0,
  });


  const getStyles = () => ({
    opacity: spring(1),
  });

  

  return (
    <TransitionMotion styles={ children ? [{key: 'key', style: getStyles(), data: children}] : [] } willLeave={ willLeave } willEnter={ willEnter }>
      { int => <div>
        { int.map(({key, style, data}) => <div key={ `${key}-transition` } style={ { transform: `rotate(${style.transform}deg)`, left: style.left, opacity: style.opacity, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' } }>
                                                     { data }
                                          </div>
        )}
              </div> }
    </TransitionMotion>
    );
};

export default Transition;