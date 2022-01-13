import * as React from 'react';


const disabledColor = '#b7bbcd';
const activeColor = '#232323';

export const AngleLeft = ({ onClick, disabled = false }) => {
  return (
    <svg onClick={onClick} width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>icons/ic_angle-left</title>
      <desc>Created with Sketch.</desc>
      <g id="icons/ic_angle-left" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      </g>
      <path
        d="M5.54043889,7.70531426 L9.62446365,3.68372062 C9.78738045,3.52076996 10.0508845,3.52076996 10.2138351,3.68372062 L10.4599709,3.92985634 C10.6229215,4.09280699 10.6229215,4.35631103 10.4599709,4.51922782 L6.91334806,8 L10.4565175,11.4807722 C10.6194343,11.643689 10.6194343,11.907193 10.4565175,12.0701437 L10.2103479,12.3162794 C10.0473973,12.47923 9.7839271,12.47923 9.62097645,12.3162794 L5.53698554,8.29468574 C5.37752209,8.13173509 5.37752209,7.86826491 5.54043889,7.70531426 Z"
        id="a"
        fill={disabled ? disabledColor : activeColor}
      />
    </svg>
  );
};

export const AngleRight = ({ onClick, disabled = false }) => {
  return (
    <svg onClick={onClick} width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>icons/ic_angle-right</title>
      <desc>Created with Sketch.</desc>
      <g id="icons/ic_angle-right" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M5.54043889,7.70531426 L9.62446365,3.68372062 C9.78738045,3.52076996 10.0508845,3.52076996 10.2138351,3.68372062 L10.4599709,3.92985634 C10.6229215,4.09280699 10.6229215,4.35631103 10.4599709,4.51922782 L6.91334806,8 L10.4565175,11.4807722 C10.6194343,11.643689 10.6194343,11.907193 10.4565175,12.0701437 L10.2103479,12.3162794 C10.0473973,12.47923 9.7839271,12.47923 9.62097645,12.3162794 L5.53698554,8.29468574 C5.37752209,8.13173509 5.37752209,7.86826491 5.54043889,7.70531426 Z"
          id="a"
          fill={disabled ? disabledColor : activeColor}
          transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
        />
      </g>
    </svg>
  );
};
