import React from 'react';

export default function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="200"
      height="200"
      style={{ shapeRendering: 'auto', display: 'block', background: 'rgb(255, 255, 255)' }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <circle
          strokeWidth={2}
          stroke="#5cb85c"
          fill="none"
          strokeDasharray="56.548667764616276 20.84955592153876"
          r="12"
          cy="50"
          cx="50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
