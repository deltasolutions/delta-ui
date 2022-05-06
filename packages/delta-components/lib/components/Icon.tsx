import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode, SVGAttributes } from 'react';
import { AnchorProps } from './Anchor';

export interface IconProps extends AnchorProps {
  size?: 'very-small' | 'small' | 'medium' | 'large' | 'auto';
  color?: 'primary' | 'secondary';
  icon: (
    props: SVGAttributes<SVGElement> & {
      children?: ReactNode;
      size?: string | number;
      color?: string;
      title?: string;
    }
  ) => JSX.Element;
}
export const Icon = forwardRef(
  ({ icon: Icon, size = 'auto', color = 'primary', ...rest }: IconProps) => {
    return (
      <Icon
        size={
          {
            'very-small': 14,
            small: 24,
            medium: 30,
            large: 42,
            auto: '100%'
          }[size]
        }
        sx={{
          ...{
            primary: {},
            secondary: {}
          }[color]
        }}
      />
    );
  }
);
