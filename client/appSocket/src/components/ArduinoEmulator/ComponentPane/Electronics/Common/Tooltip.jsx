import React from 'react';
import './Tooltip.css';

const Tooltip = ({ x, y, name }) => {
  const tooltipOffsetX = 10;
  const tooltipOffsetY = -30;
  
  const adjustedTooltipX = Math.min(x + tooltipOffsetX, window.innerWidth - 60);
  const adjustedTooltipY = Math.max(y + tooltipOffsetY, 0);
  const finalTooltipY = Math.min(adjustedTooltipY, window.innerHeight - 30);

  return (
    <g transform={`translate(${adjustedTooltipX - 25}, ${finalTooltipY})`}>
      <rect
        width={50}
        height={20}
        rx={5}
        fill="rgba(255, 255, 255, 0.9)"
        stroke="rgba(0, 0, 0, 0.5)"
      />
      <text
        x={25}
        y={15}
        className="pin-info"
        textAnchor="middle"
        style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', fill: 'black' }}
      >
        {name}
      </text>
    </g>
  );
};

export default Tooltip;
