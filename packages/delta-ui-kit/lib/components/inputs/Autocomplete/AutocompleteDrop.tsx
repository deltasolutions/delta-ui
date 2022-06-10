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
import { useTranslation } from 'react-i18next';
import { DropRendererProps } from '../../../hooks';
import { getChildrenKey } from '../../../utils';
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
  const [tCommon] = useTranslation('common');
  const { childrenArray, selections, handleRemoval, handleAddition } =
    useContext(AutocompleteContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const contextValue = useMemo(
    () => ({ activeIndex, setActiveIndex }),
    [activeIndex]
  );
  const selectedValues = useMemo(
    () => selections.map(i => i.value),
    [selections]
  );
  useEffect(() => {
    setActiveIndex(0);
  }, [getChildrenKey(childrenArray, { pivots: ['value'] })]);
  useEffect(() => {
    const handleKeyDown = ev => {
      switch (ev.key) {
        case 'Enter':
          const child = childrenArray[activeIndex];
          const value = child.props.value;
          selectedValues.includes(value)
            ? handleRemoval(value)
            : handleAddition(child.props?.value, getTitleByChild(child));
          break;
        case 'Escape':
          handleClose();
          break;
        case 'ArrowUp':
          setActiveIndex(v => (v === 0 ? v : v - 1));
          break;
        case 'ArrowDown':
          setActiveIndex(v => (v === childrenArray.length - 1 ? v : v + 1));
          break;
      }
    };
    addEventListener('keydown', handleKeyDown);
    return () => removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, childrenArray, handleAddition, handleRemoval]);
  if (childrenArray.length === 0) {
    return null;
  }

  return (
    <AutocompleteDropContext.Provider value={contextValue}>
      <Box
        ref={ref}
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'border',
          backgroundColor: 'onContrast',
          borderRadius: 4,
        }}
      >
        {childrenArray.map((v, i) => {
          const value = v.props?.value;
          const selected = selectedValues?.includes(value);
          return cloneElement(v, {
            index: i,
            selected,
            active: i === activeIndex,
            onAdd: () => {
              handleAddition(value, getTitleByChild(v));
              setActiveIndex(0);
            },
            onRemove: () => handleRemoval(value),
          });
        })}
      </Box>
    </AutocompleteDropContext.Provider>
  );
});
