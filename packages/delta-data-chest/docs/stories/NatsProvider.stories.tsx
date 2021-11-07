import { Meta } from '@storybook/react';
import { JSONCodec } from 'nats.ws/lib/src/mod';
import React, { useEffect, useMemo } from 'react';
import {
  makeNatsDataOperator,
  NatsDataOperatorContext,
  NatsDataOperatorOptions,
  NatsProvider,
  useDataChest,
  useNats
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
  const { fetch } = useDatacenterChest();
  useEffect(() => {
    fetch({}).then(console.log);
  }, [fetch]);
  return <div />;
};

const makeDatacenterOperator = (
  options: Omit<NatsDataOperatorOptions<any>, 'provider'>
) => {
  const codec = JSONCodec();
  const subject = 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT';
  return makeNatsDataOperator({
    ...options,
    provider: {
      fetch:
        ({ connection }: NatsDataOperatorContext) =>
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
        },
      fetch2:
        ({ connection }: NatsDataOperatorContext) =>
        async () => {
          if (!connection) {
            console.log('no connection');
            return;
          }
          const message = await connection.request(subject, codec.encode({}));
          const data = codec.decode(message.data) as number;
          return { data: null };
        }
    }
  });
};

const useDatacenterChest = () => {
  const { connection } = useNats();
  const operator = useMemo(
    () => makeDatacenterOperator({ connection }),
    [connection]
  );
  operator.fetch({});
  operator.fetch2();
  const seeder = useMemo(() => ({}), []);
  const chest = useDataChest<typeof operator, typeof seeder>({
    operator
  });
  return chest;
};
