import { Global } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import {
  Box,
  Container,
  encoreDarkScheme,
  Layout,
  LayoutBody,
  LayoutBodyMain
} from '../lib';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen',
  options: {
    storySort: {
      order: ['Inputs', 'Floating', 'Feedback', 'Data display']
    }
  }
};
export const decorators = [
  Story => {
    return (
      <Container>
        <Global
          styles={{
            'html, body': {
              colorScheme: 'dark',
              overscrollBehaviorY: 'none',
              margin: 0,
              padding: 0,
              fontSize: '14px'
            },
            '*': {
              boxSizing: 'border-box',
              fontFamily: 'Montserrat, sans-serif',
              color: encoreDarkScheme.colors.text_subdued
            }
          }}
        />
        <Layout>
          <LayoutBody>
            <LayoutBodyMain
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                m: 20
              }}
            >
              <Story />
            </LayoutBodyMain>
          </LayoutBody>
        </Layout>
      </Container>
    );
  }
];
