import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useMemo } from 'react';
import { Box, Button, ButtonProps } from '../components';
import { useLoader } from './useLoader';

export default {
  title: 'hooks/useLoader',
} as Meta;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const Basics = () => {
  const loaderId = useMemo(() => Symbol(), []);
  const [isLoading, load] = useLoader([loaderId]);
  const addTask = useCallback(() => {
    load(delay(2000));
    load(delay(500));
    load(
      (async () => {
        await delay(200);
        throw new Error();
      })()
    );
  }, []);
  return (
    <Button disabled={isLoading} variant="contained" onClick={addTask}>
      Add Task
    </Button>
  );
};

export const SharedLoaders = () => {
  const sharedLoaderId = useMemo(() => Symbol(), []);
  const AnotherComponent = useCallback(() => {
    const [_, load] = useLoader([sharedLoaderId]);
    const addTask = useCallback(() => load(delay(2000)), []);
    return (
      <Button variant="contained" onClick={addTask}>
        Add Task
      </Button>
    );
  }, []);
  const [isLoading] = useLoader([sharedLoaderId]);
  return (
    <Box>
      <AnotherComponent />
      <Box
        sx={{
          mt: 2,
          p: 3,
          borderRadius: 2,
          border: '1px dashed',
          borderColor: isLoading ? 'warning' : 'success',
        }}
      >
        {isLoading ? 'Loading' : 'Idling'}
      </Box>
    </Box>
  );
};

export const CompoundLoaders = () => {
  const Loadable = useCallback(
    ({ ids, ...rest }: { ids: any[] | undefined } & ButtonProps) => {
      const [isLoading, load] = useLoader(ids);
      const handleClick = useCallback(() => load(delay(2000)), []);
      return (
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={handleClick}
          {...rest}
        />
      );
    },
    []
  );
  const a = useMemo(() => Symbol(), []);
  const b = useMemo(() => Symbol(), []);
  const c = useMemo(() => Symbol(), []);
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Loadable ids={[a]}>A</Loadable>
      <Loadable ids={[b]}>B</Loadable>
      <Loadable ids={[c]}>C</Loadable>
      <Loadable ids={[]}>D</Loadable>
      <Loadable ids={[a, b]}>A + B</Loadable>
      <Loadable ids={[b, c]}>B + C</Loadable>
      <Loadable ids={undefined}>Global</Loadable>
    </Box>
  );
};
