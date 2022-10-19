import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useState, useEffect, Fragment } from 'react';
import { ImperativePortal } from '../../../../hooks';
import { TextInputProps } from '../../TextInput';
import { ComplexSearchContext, DropContext } from '../contexts';
import { Input } from '../Input';
import { ComplexSearchSegment } from '../types';

export interface SegmentInputProps extends TextInputProps {
  portal: ImperativePortal;
  editing: boolean;
  item: ComplexSearchSegment;
}

export const SegmentInput = forwardRef<HTMLInputElement, SegmentInputProps>(
  ({ item, editing, portal }, ref) => {
    const { proposals } = useContext(ComplexSearchContext);
    const maybePropose = proposals.find(pr => pr.key === item.key);
    const [tokenKey, tokenValue] =
      Object.entries(item)
        .filter(([_, tokenValue]) => typeof tokenValue === 'string')
        .at(-1) ?? [];

    const getInputValue = () => {
      let output: string = '';
      if (maybePropose) {
        if (tokenKey === 'key') {
          output = maybePropose.label;
        }
        if (tokenKey === 'operator') {
          const maybeOperator = maybePropose.operators.find(
            opr => opr.key === tokenValue
          );
          if (maybeOperator) {
            output = maybeOperator.label;
          }
        }
        if (tokenKey === 'value') {
          if (maybePropose.getOptions) {
            output = maybePropose.getSelectionQuery?.(tokenValue) ?? '';
          }
        }
      }
      return output || tokenValue;
    };
    const [inputValue, setInputValue] = useState<string | undefined>(
      getInputValue()
    );

    useEffect(() => {
      setInputValue(getInputValue());
    }, []);

    return (
      <Fragment>
        <DropContext.Provider value={{ query: inputValue }}>
          {portal}
          <Input
            ref={ref}
            style={{ width: editing ? '200px' : '0px' }}
            tabIndex={editing ? 0 : -1}
            value={inputValue}
            onChange={setInputValue}
          />
        </DropContext.Provider>
      </Fragment>
    );
  }
);
