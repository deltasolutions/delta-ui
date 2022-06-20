import { jsx } from '@theme-ui/core';
import {
  createContext,
  Dispatch,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import { DropRendererProps } from '../../../hooks';
import { DropMenu } from '../DropMenu';
import { AutocompleteContext } from './Autocomplete';
import { getTitleByValue } from './utils';

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
>(({ handleClose, ...rest }, ref) => {
  const { childrenArray, selections, handleRemoval, handleAddition } =
    useContext(AutocompleteContext);
  const selectedValues = useMemo(
    () => selections.map(i => i.value),
    [selections]
  );
  if (childrenArray.length === 0) {
    return null;
  }
  return (
    <DropMenu
      ref={ref}
      handleClose={handleClose}
      selectedValues={selectedValues}
      onItemClick={v => {
        selectedValues.includes(v)
          ? handleRemoval(v)
          : handleAddition(v, getTitleByValue(childrenArray, v));
      }}
      {...rest}
    >
      {childrenArray}
    </DropMenu>
  );
});
