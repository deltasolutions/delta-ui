import { Meta } from '@storybook/react';
import { JSONCodec, NatsConnection } from 'nats.ws/lib/src/mod';
import React, { useEffect, useMemo } from 'react';
import {
  createNatsDataOperator,
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
  options: Omit<NatsDataOperatorOptions<number, any>, 'provider'>
) => {
  const codec = JSONCodec();
  const subject = 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT';
  const provider = {
    fetch: async (
      { connection }: NatsDataOperatorContext,
      search: { query?: string }
    ) => {
      if (!connection) {
        console.log('no connection');
        return;
      }
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

const useDatacenterChest = () => {
  const { connection } = useNats();
  const operator = useMemo(
    () => makeDatacenterOperator({ connection }),
    [connection]
  );
  const seeder = useMemo(() => ({}), []);
  const chest = useDataChest<number, typeof operator, typeof seeder>({
    operator
  });
  return chest;
};
