import { Meta } from '@storybook/react';
import { JSONCodec } from 'nats.ws/lib/src/mod';
import React, { useEffect } from 'react';
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
    <NatsProvider servers="ws://192.168.200.49:2222">
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
    const operator = makeDatacenterOperator({ connection });
    operator.fetch({}).then(v => console.log(v));
  }, [connection]);
  return null;
};

const makeDatacenterOperator = (
  options: Omit<NatsDataOperatorOptions<number, any>, 'provider'>
) => {
  const codec = JSONCodec();
  const subject = 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT';
  const provider = {
    fetch: async ({ connection }, search: { query?: string }) => {
      const message = await connection.request(subject, codec.encode(search));
      const data = codec.decode(message.data) as number;
      return { data };
    }
  };
  return createNatsDataOperator<number, typeof provider>({
    ...options,
    provider
  });
};
