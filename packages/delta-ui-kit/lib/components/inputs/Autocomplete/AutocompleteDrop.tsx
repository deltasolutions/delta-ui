import { jsx } from '@theme-ui/core';
import { createContext, Dispatch, forwardRef, useContext } from 'react';
import { DropRendererProps } from '../../../hooks';
import { hash } from '../../../utils';
import { DropMenu, DropMenuItem } from '../DropMenu';
import { AutocompleteContext } from './Autocomplete';

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
  const { options, selections, handleRemoval, handleAddition, renderOption } =
    useContext(AutocompleteContext);
  if (options.length < 1) {
    return null;
  }
  return (
    <DropMenu
      ref={ref}
      handleClose={handleClose}
      selectedValues={selections}
      onItemClick={v => {
        selections.includes(v) ? handleRemoval(v) : handleAddition(v);
      }}
      {...rest}
    >
      {options.map(v => (
        <DropMenuItem key={hash(v)} value={v}>
          {renderOption?.(v) ?? String(v)}
        </DropMenuItem>
      ))}
    </DropMenu>
  );
});
