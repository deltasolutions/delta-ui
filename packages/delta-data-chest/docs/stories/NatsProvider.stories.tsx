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

export const Basics = () => {
  return (
    <NatsProvider servers="ws://192.168.200.49:2222">
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
    <NatsProvider servers="ws://192.168.200.49:2222">
      <DataChestDemo />
    </NatsProvider>
  );
};

const DataChestDemo = () => {
  const { fetch } = useNatsDataChest(makeDatacenterOperator);
  useEffect(() => {
    fetch({}).then(console.log);
  }, [fetch]);
  return <div />;
};

const makeDatacenterOperator = (context: NatsDataOperatorContext) => {
  const codec = JSONCodec();
  const subject = 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT';
  return makeNatsDataOperator({
    ...context,
    provider: {
      fetch:
        ({ connection }) =>
        async (search: { query?: string }) => {
          if (!connection) {
            console.log('no connection');
            return;
          }
          const message = await connection.request(
            subject,
            codec.encode(search)
          );
          const data = codec.decode(message.data) as number;
          return { data };
        }
    }
  });
};
