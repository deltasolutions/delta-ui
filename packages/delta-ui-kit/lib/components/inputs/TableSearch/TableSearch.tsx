import { jsx } from '@theme-ui/core';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useUpdateEffect } from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { Bunch } from './Bunch';
import { Container } from './Container';
import { TableSearchContext } from './contexts';
import { StaticSearch } from './StaticSearch';
import { BunchData, Propose } from './types';

export interface TableSearchProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  onChange?: (value: BunchData[]) => void;
  value?: BunchData[];
  proposes: Propose[];
}

export const TableSearch = ({
  onChange,
  proposes,
  disabled,
  value: propsValue = [],
}: TableSearchProps) => {
  const [value, setValue] = useState<BunchData[]>(propsValue);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<
    number | undefined | null
  >(null);
  const onBunchRemove = (index, byMouse?: false) => {
    if (byMouse) {
      setCurrentEditingIndex(undefined);
    } else {
      if (value[index - 1]) {
        setCurrentEditingIndex(index - 1);
      } else {
        setCurrentEditingIndex(undefined);
      }
    }
    setValue(prev => {
      const next = prev.filter((_, filterIndex) => {
        return filterIndex !== index;
      });
      return next;
    });
  };
  useUpdateEffect(() => {
    if (propsValue !== value) {
      setValue(propsValue);
    }
  }, [propsValue]);
  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <TableSearchContext.Provider
      value={{
        proposes,
        disabled,
        value,
        currentEditingIndex,
        setCurrentEditingIndex,
        onBunchRemove,
        setValue,
      }}
    >
      <Container>
        {value.map((bunch, index) => (
          <Bunch key={index} bunch={bunch} index={index} />
        ))}
        <StaticSearch />
      </Container>
    </TableSearchContext.Provider>
  );
};
