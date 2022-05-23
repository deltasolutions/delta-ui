import { jsx, ThemeProvider } from '@theme-ui/core';
import { FC, HTMLAttributes } from 'react';
import { theme as defaultTheme, Theme } from '../theme';
import { Box } from './Box';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
}

export const Container: FC<ContainerProps> = ({
  children,
  theme = defaultTheme,
  ...rest
}) => {
  return (
    <Box
      sx={{
        fontFamily: theme.fontFamily,
        color: theme.colors.onBackground,
        fontSize: theme.fontSizes[3],
      }}
    >
      <ThemeProvider theme={theme} {...rest}>
        {children}
      </ThemeProvider>
    </Box>
  );
};
