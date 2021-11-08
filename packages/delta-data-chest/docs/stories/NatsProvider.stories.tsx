import { Meta } from '@storybook/react';
import { JSONCodec } from 'nats.ws';
import React, { useEffect } from 'react';
import {
  makeNatsDataOperator,
  NatsDataOperatorContext,
  NatsProvider,
  useNats,
  useNatsDataChest
} from '../../lib';

export default {
  title: 'General/Nats'
} as Meta;

const samples = {
  servers: 'ws://192.168.200.49:2222',
  searchSubject: 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT'
};

export const Basics = () => {
  return (
    <NatsProvider servers={samples.servers}>
      <BasicsDemo />
    </NatsProvider>
  );
};

const BasicsDemo = () => {
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

export const DataChest = () => {
  return (
    <NatsProvider servers={samples.servers}>
      <DataChestDemo />
    </NatsProvider>
  );
};

const DataChestDemo = () => {
  const { fetch } = useNatsDataChest({ make: makeDatacenterOperator });
  useEffect(() => {
    fetch({}).then(console.log);
  }, [fetch]);
  return <div />;
};

const makeDatacenterOperator = (context: NatsDataOperatorContext) => {
  const codec = JSONCodec();
  return makeNatsDataOperator({
    ...context,
    provider: {
      fetch:
        ({ connection }) =>
        async (search: { query?: string }) => {
          if (!connection) {
            return;
          }
          const message = await connection.request(
            samples.searchSubject,
            codec.encode(search)
          );
          const data = codec.decode(message.data) as number;
          return { data };
        }
    }
  });
};
