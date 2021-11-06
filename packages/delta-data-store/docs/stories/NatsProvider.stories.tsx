import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect } from 'react';
import {
  createNatsDataOperator,
  NatsDataOperatorOptions,
  NatsProvider,
  useNats
} from '../../lib';

export default {
  title: 'General/NatsProvider'
} as Meta;

export const Basics = () => {
  return (
    <NatsProvider connectOptions={{ servers: '' }}>
      <Demo />
    </NatsProvider>
  );
};

const Demo = () => {
  const { connection } = useNats();
  useEffect(() => {
    if (!connection) {
      return;
    }
    const operator = createDatacenterCollectionOperator({ connection });
    console.log(operator);
  }, [connection]);
  return null;
};

const createDatacenterCollectionOperator = <Data extends object>(
  options: Omit<NatsDataOperatorOptions<Data>, 'provider'>
) =>
  createNatsDataOperator({
    ...options,
    provider: {}
  });
