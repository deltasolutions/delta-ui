import { jsx } from '@theme-ui/core';
import { cloneDeep } from 'lodash-es';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useLoader } from '../../hooks';
import { Box } from '../containers';
import { Autocomplete, AutocompleteProps } from './Autocomplete';

export interface TableSearchProps extends AutocompleteProps {
  options: Option[];
  value?: string[];
}
interface Option {
  getItems: () => Promise<unknown[]>;
  renderOption: (datum) => ReactNode;
  renderSelection: (datum) => ReactNode;
  id: string;
  label: string;
}

export const TableSearch = ({
  onChange: propsOnChange,
  options = [],
  value: propsValue,
}: TableSearchProps) => {
  const [loading, load] = useLoader();
  const [value, setValue] = useState<string[]>();
  const [currentItems, setCurrentItems] = useState<{
    [key: string]: unknown[];
  }>({});
  useEffect(() => {
    setValue(propsValue);
    propsOnChange?.(propsValue);
  }, [propsValue]);
  const getOptionIds = useCallback(
    async query => {
      const possible = options
        .filter(option => option.label.includes(query))
        .filter(option => !value?.includes(option.id));
      const lastId = value?.at(-1);
      if (lastId?.includes('|')) {
        const option = options.find(
          option => option.id === lastId.split('|')[0]
        );
        if (option) {
          const items = await option.getItems();
          setCurrentItems(prev => ({ ...prev, [option.id]: items }));
          return items.map((i: { id: string }) => i.id);
        }
      }
      if (options.some(option => option.id === lastId)) {
        return [`${lastId}|=`, `${lastId}|!=`];
      }
      return possible.map(i => i.id);
    },
    [value]
  );
  const renderOption = useCallback(
    (id: string) => {
      if (id.includes('|')) {
        return id.split('|')[1];
      }
      const candidateOption = options.find(option => option.id === id);
      if (candidateOption) {
        return candidateOption.label;
      }
      const prevSelectedId = value?.at(-1)?.split('|')[0] ?? '';
      const option = options.find(option => option.id === prevSelectedId);
      return option?.renderOption(
        currentItems[option.id].find((i: { id: string }) => i.id === id)
      );
    },
    [options, value, currentItems]
  );

  const renderSelection = useCallback(
    (id: string, index: number) => {
      if (id.includes('|')) {
        return id.split('|')[1];
      }
      const candidateOption = options.find(option => option.id === id);
      if (candidateOption) {
        return candidateOption.label;
      }
      const prevSelectedId = value?.[index - 1].split('|')[0] ?? '';
      const option = options.find(option => option.id === prevSelectedId);
      return option?.renderSelection(
        currentItems[option.id].find((i: { id: string }) => i.id === id)
      );
    },
    [value, options, currentItems]
  );
  const onChange = useCallback(
    v => {
      setValue(v);
      propsOnChange?.(v);
    },
    [propsOnChange]
  );

  return (
    <Autocomplete
      multiple
      getOptions={getOptionIds}
      renderOption={renderOption}
      renderSelection={renderSelection}
      sx={{
        '& > div:nth-of-type(5n)': {
          marginLeft: '8px',
        },
      }}
      value={value}
      onChange={onChange}
    />
  );
};
