import React from 'react';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  return (
    <div className={props.asOverlay && classes.loadingspinneroverlay}>
      <div className={classes.ldsdualring}></div>
    </div>
  );
};

export default LoadingSpinner;
