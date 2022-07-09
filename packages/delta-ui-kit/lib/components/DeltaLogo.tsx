import { jsx } from '@theme-ui/core';
import { SVGAttributes } from 'react';

export interface DeltaLogoProps extends SVGAttributes<SVGSVGElement> {
  topColor?: string;
  bottomColor?: string;
}

export const DeltaLogo = ({
  topColor = 'currentColor',
  bottomColor = 'currentColor',
  ...rest
}: DeltaLogoProps) => {
  return (
    <svg viewBox="0 0 68.3 53.3" x="0px" y="0px" {...rest}>
      <g>
        <polygon
          points="37.6,47.3 10.4,47.3 24,23.7 24,23.7 27.4,17.8 24,11.8 0,53.3 47.9,53.3 44.5,47.3  "
          sx={{ fill: bottomColor }}
        />
        <polygon
          points="44.4,0 20.4,41.5 68.3,41.5  "
          sx={{ fill: topColor }}
        />
      </g>
    </svg>
  );
};
