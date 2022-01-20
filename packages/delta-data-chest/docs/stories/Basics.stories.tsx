import { Meta } from '@storybook/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  getNatsConnection,
  makeChest,
  setDefaultNatsConnectionOptions,
  useChest
} from '../../lib';

export default {
  title: 'General'
} as Meta;

export const Chest = () => {
  const todoCollection = useChest<object[]>([]);
  const todos = todoCollection.use();
  const handleFetching = useCallback(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const json = await response.json();
    todoCollection.set(json);
  }, []);
  useEffect(() => {
    handleFetching();
  }, []);
  return (
    <div>
      <div>Todos:</div>
      <div>{JSON.stringify(todos)}</div>
    </div>
  );
};

export const GlobalChests = () => {
  // One can make these globally and use via direct import.
  const appChests = useMemo(() => {
    return makeChest({
      todoCollection: makeChest([] as object[]),
      todoResource: makeChest({})
    });
  }, []);
  // Using in various components.ß
  const { todoResource } = appChests.use();
  const todo = todoResource.use();
  return (
    <div>
      <div>Todo</div>
      <div>{JSON.stringify(todo)}</div>
    </div>
  );
};

export const Nats = () => {
  const handleConnection = useCallback(async () => {
    const connection = await getNatsConnection();
    console.log(connection);
  }, []);
  useEffect(() => {
    setDefaultNatsConnectionOptions({ servers: 'demo.nats.io' });
    handleConnection();
  }, []);
  return null;
};
