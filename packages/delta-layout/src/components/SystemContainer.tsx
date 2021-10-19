import isPropValid from '@emotion/is-prop-valid';
import { Global } from '@emotion/react';
import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  SystemContainer as RestylerContainer,
  SystemContainerProps as RestylerContainerProps
} from 'restyler';
import { theme as defaultTheme } from 'restyler-theme-delta';

export const SystemContainer = ({
  theme = defaultTheme,
  children,
  ...rest
}: Partial<RestylerContainerProps>) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <RestylerContainer styled={styled} theme={theme} {...rest}>
          <Global
            styles={{
              'html, body, #root': {
                margin: '0 !important',
                padding: '0 !important',
                minHeight: '100vh'
              }
            }}
          />
          {children}
        </RestylerContainer>
      </ThemeProvider>
    </DndProvider>
  );
};

const styled = (Tag: any, fn: Function) =>
  forwardRef((props: any, ref: any) => {
    const { theme, kind, ...rest } = props as any;
    const validProps = Object.keys(rest).reduce(
      (p, k) => (isPropValid(k) ? { ...p, [k]: rest[k] } : p),
      { sx: fn(props) }
    );
    return <Tag ref={ref} {...validProps} />;
  }) as any;
