import { ComponentStory, Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { IoPlay } from 'react-icons/io5';
import { Button } from './Button';
import { Box } from './containers';

export default {
  title: 'Interactive/Button',
  component: Button,
} as Meta;

const colors = ['primary', 'secondary', 'info', 'success', 'error'] as const;

export const Default = () => (
  <Button sx={{ width: '300px', height: '300px', background: 'grey' }} />
);

export const Contained = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {colors.map(v => (
      <Button key={v} color={v} variant="contained">
        Click Me
      </Button>
    ))}
  </Box>
);

export const ContainedDimmed = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {colors.map(v => (
      <Button key={v} color={v} variant="contained-dimmed">
        Click Me
      </Button>
    ))}
  </Box>
);

export const Outlined = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {colors.map(v => (
      <Button key={v} color={v} variant="outlined">
        Click Me
      </Button>
    ))}
  </Box>
);

export const Text = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {colors.map(v => (
      <Button key={v} color={v} variant="text">
        Click Me
      </Button>
    ))}
  </Box>
);

export const Icon = () => (
  <Box>
    <Button icon={IoPlay} size="small" variant="icon" />
    <Button icon={IoPlay} size="medium" variant="icon" />
  </Box>
);

export const WithIcon = () => (
  <Button color="primary" icon={IoPlay} variant="contained">
    Play
  </Button>
);
