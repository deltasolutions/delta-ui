import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import { isEqual } from 'lodash-es';
import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useMemo,
  InputHTMLAttributes,
} from 'react';
import { useUpdateEffect } from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { AddSegment } from './AddSegment';
import { ComplexSearchContainer } from './ComplexSearchContainer';
import { ComplexSearchContext } from './contexts';
import { Segments, Segment } from './Segments';
import { ComplexSearchSegment, ComplexSearchProposal } from './types';

export interface ComplexSearchProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  value?: ComplexSearchSegment[];
  proposals: ComplexSearchProposal[];
}

export const ComplexSearch = ({
  value = [],
  proposals,
  onChange,
  ...inputPropos
}: ComplexSearchProps) => {
  const [segments, setSegments] = useState<ComplexSearchSegment[]>(value);
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined
  );

  const addSegment = useCallback(key => {
    setSegments(curr => {
      return [...curr, { key, operator: '' }];
    });
  }, []);
  const removeSegment = useCallback((index: number) => {
    setSegments(curr => {
      const next = [...curr];
      next.splice(index, 1);
      return next;
    });
  }, []);
  const updateSegment = useCallback(
    (index: number, key: string, value?: string) => {
      setSegments(curr => {
        const next = [...curr];
        next[index][key] = value;
        return next;
      });
    },
    []
  );

  const contextValue = {
    proposals,
    addSegment,
    removeSegment,
    segments,
    updateSegment,
    setEditingIndex,
    editingIndex,
  };
  const memoizedContextValue = useMemo(
    () => contextValue,
    Object.values(contextValue)
  );
  useUpdateEffect(() => {
    onChange?.(segments);
  }, [segments]);

  useEffect(() => {
    if (!isEqual(value, segments)) {
      setEditingIndex(undefined);
      setSegments(value);
    }
  }, [value]);

  return (
    <ComplexSearchContext.Provider value={memoizedContextValue}>
      <ComplexSearchContainer>
        <Segments>
          {segments.map((item, index) => (
            <Segment key={`${hash(item)}-${index}`} index={index} item={item} />
          ))}
          <AddSegment key={segments.length} {...inputPropos} />
        </Segments>
      </ComplexSearchContainer>
    </ComplexSearchContext.Provider>
  );
};
