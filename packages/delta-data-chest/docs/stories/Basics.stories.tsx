import { Meta } from '@storybook/react';
import { JSONCodec } from 'nats.ws';
import React, { useEffect } from 'react';
import {
  getNatsConnection,
  setDefaultNatsConnectionOptions,
  useDataChest
} from '../../lib';

export default {
  title: 'Basics'
} as Meta;

export const Operator = () => {
  useEffect(() => {
    setDefaultNatsConnectionOptions({ servers: samples.servers });
    datacenterCollectioner.search({}).then(v => console.log(v));
  }, []);
  return null;
};

export const DataChest = () => {
  const { data, search } = useDataChest([] as object[], datacenterCollectioner);
  useEffect(() => {
    setDefaultNatsConnectionOptions({ servers: samples.servers });
    search({});
  }, [search]);
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

const samples = {
  servers: 'ws://192.168.200.49:2222',
  searchSubject: 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT'
};
const codec = JSONCodec();
const datacenterCollectioner = {
  search: async (search: { query?: string }) => {
    const connection = await getNatsConnection();
    const message = await connection.request(
      samples.searchSubject,
      codec.encode(search)
    );
    const data = codec.decode(message.data) as object[];
    return { data };
  }
};
