import { Global } from '@emotion/react';
import { jsx, ThemeProvider } from '@theme-ui/core';
import { FC, Fragment, HTMLAttributes, useContext } from 'react';
import { encoreDarkScheme } from '../encoreDarkScheme';
import { ColorScheme } from '../models';
import { Box } from './Box';
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  theme?: ColorScheme;
}
export const Container: FC<ContainerProps> = ({
  children,
  theme: propsTheme,
  ...rest
}) => {
  const theme = propsTheme || encoreDarkScheme;
  return (
    <Fragment>
      <ThemeProvider theme={theme} {...rest}>
        <Box sx={{ position: 'relative', zIndex: 999 }} id="modal-root" />
        {children}
      </ThemeProvider>
    </Fragment>
  );
};
