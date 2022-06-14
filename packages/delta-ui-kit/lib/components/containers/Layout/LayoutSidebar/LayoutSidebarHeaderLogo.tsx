import { jsx } from '@theme-ui/core';
import { forwardRef, ImgHTMLAttributes } from 'react';

export interface LayoutSidebarHeaderLogoProps
  extends ImgHTMLAttributes<HTMLImageElement> {}

export const LayoutSidebarHeaderLogo = forwardRef<
  HTMLImageElement,
  LayoutSidebarHeaderLogoProps
>((props, ref) => {
  return <img ref={ref} sx={{}} {...props} />;
});
