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
    setDefaultNatsConnectionOptions({ servers: demo.servers });
    collectioner.search({}).then(v => console.log(v));
  }, []);
  return null;
};

export const DataChest = () => {
  const collection = useDataChest<object[]>([]);
  useEffect(() => {
    setDefaultNatsConnectionOptions({ servers: demo.servers });
    collectioner.search({}).then(collection.set);
  }, []);
  return <div>{JSON.stringify(collection.get(), null, 2)}</div>;
};

export const ReactiveDataChest = () => {
  const collection = useDataChest<object[]>([]);
  const data = collection.use();
  useEffect(() => {
    setDefaultNatsConnectionOptions({ servers: demo.servers });
    collectioner.search({}).then(collection.set);
  }, []);
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

const demo = {
  servers: 'ws://192.168.200.49:2222',
  searchSubject: 'DS.DCM.DATACENTER.REQUEST.SEARCH.DEFAULT'
};
const codec = JSONCodec();
const collectioner = {
  search: async (search: { query?: string }) => {
    const connection = await getNatsConnection();
    const message = await connection.request(
      demo.searchSubject,
      codec.encode(search)
    );
    const data = codec.decode(message.data) as object[];
    return data;
  }
};
