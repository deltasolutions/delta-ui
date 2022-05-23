import { Global } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import {
  Box,
  Container,
  darkTheme,
  Layout,
  LayoutBody,
  LayoutBodyMain,
} from '../lib';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  options: {
    storySort: {
      order: ['Inputs', 'Floating', 'Feedback', 'Data Display'],
    },
  },
};
export const decorators = [
  Story => {
    return (
      <Container>
        <Global
          styles={{
            'html, body': {
              colorScheme: darkTheme.colorScheme,
              overscrollBehaviorY: 'none',
              margin: 0,
              padding: 0,
              color: darkTheme.colors.onBackground,
              fontSize: darkTheme.fontSizes[1],
            },
            '*': {
              boxSizing: 'border-box',
              fontFamily: darkTheme.fontFamily,
            },
          }}
        />
        <Layout>
          <LayoutBody>
            <LayoutBodyMain
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 20,
              }}
            >
              <Story />
            </LayoutBodyMain>
          </LayoutBody>
        </Layout>
      </Container>
    );
  },
];
