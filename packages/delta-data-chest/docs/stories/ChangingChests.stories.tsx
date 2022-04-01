import { Meta } from '@storybook/react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import { createChest } from '../../lib';

export default {
  title: 'ChangingChests'
} as Meta;

const createChests = () => ({ resource: createChest(0) });
const ChestsContext = createContext(createChests());
const Consumer = () => {
  const { resource } = useContext(ChestsContext);
  const value = resource.use();
  return <div>Value is {value}</div>;
};

export const ChangingChests = () => {
  const [counter, updateChests] = useReducer(v => (v + 1) % 1000, 0);
  const chests = useMemo(() => createChests(), [counter]);
  const updateResource = () => {
    chests.resource.set(v => v + 1);
  };
  return (
    <ChestsContext.Provider value={chests}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
          alignItems: 'start'
        }}
      >
        <button onClick={updateChests}>Update Chests</button>
        <button onClick={updateResource}>Update Resource</button>
        <Consumer />
      </div>
    </ChestsContext.Provider>
  );
};
