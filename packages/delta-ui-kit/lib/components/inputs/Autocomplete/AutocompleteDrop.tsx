import { jsx } from '@theme-ui/core';
import {
  cloneElement,
  createContext,
  Dispatch,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IoBanOutline } from 'react-icons/io5';
import { DropRendererProps, useUpdateEffect } from '../../../hooks';
import { Box } from '../../containers';
import { AutocompleteContext } from './Autocomplete';
import { getTitleByChild } from './utils';

export interface AutocompleteDropProps extends DropRendererProps {}

export const AutocompleteDropContext = createContext(
  {} as {
    activeIndex: number | null;
    setActiveIndex: Dispatch<React.SetStateAction<number | null>>;
  }
);

export const AutocompleteDrop = forwardRef<
  HTMLDivElement,
  AutocompleteDropProps
>(({ handleClose }, ref) => {
  const { availables, handleAddition } = useContext(AutocompleteContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const contextValue = useMemo(
    () => ({ activeIndex, setActiveIndex }),
    [activeIndex]
  );
  const availablesRef = useRef(availables);
  useUpdateEffect(() => {
    availablesRef.current = availables;
  }, [availables]);
  useEffect(() => {
    const handleKeyDown = ev => {
      switch (ev.key) {
        case 'Enter':
          const child = availablesRef.current[activeIndex];
          handleAddition(child.props?.value, getTitleByChild(child));
          setActiveIndex(0);
          break;
        case 'Escape':
          handleClose();
          break;
        case 'ArrowUp':
          setActiveIndex(v => (v === 0 ? v : v - 1));
          break;
        case 'ArrowDown':
          setActiveIndex(v =>
            v === availablesRef.current.length - 1 ? v : v + 1
          );
          break;
      }
    };
    addEventListener('keydown', handleKeyDown);
    return () => removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleAddition]);
  if (availables.length === 0) {
    return (
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IoBanOutline
          size={18}
          sx={{
            verticalAlign: 'middle',
          }}
        />
      </Box>
    );
  }
  return (
    <AutocompleteDropContext.Provider value={contextValue}>
      <Box
        ref={ref}
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {availables.map((v, i) =>
          cloneElement(v, {
            index: i,
            active: i === activeIndex,
            onClick: () => {
              handleAddition(v?.props?.value, getTitleByChild(v));
              setActiveIndex(0);
            },
          })
        )}
      </Box>
    </AutocompleteDropContext.Provider>
  );
});
