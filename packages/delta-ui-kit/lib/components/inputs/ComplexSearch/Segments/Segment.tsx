import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import {
  HTMLAttributes,
  useContext,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { useDrop, useImperativePortal } from '../../../../hooks';
import { mergeRefs } from '../../../../utils';
import { Box, SystemContext } from '../../../containers';
import { ComplexSearchContext } from '../contexts';
import { Drop } from '../Drop';
import { ComplexSearchSegment } from '../types';
import { SegmentInput } from './SegmentInput';
import { SegmentToken } from './SegmentToken';

export interface SegmentPropos extends HTMLAttributes<HTMLLIElement> {
  item: ComplexSearchSegment;
  index: number;
}

export const Segment = ({ item, index, ...props }: SegmentPropos) => {
  const {
    removeSegment,
    updateSegment,
    editingIndex,

    setEditingIndex,
    proposals,
  } = useContext(ComplexSearchContext);
  const { floatingPortal } = useContext(SystemContext);
  const editing = useMemo(() => editingIndex === index, [editingIndex, index]);
  const propose = proposals.find(pr => pr.key === item?.key);
  const dropRef = useRef<HTMLDivElement>(null);
  const portal = useImperativePortal(floatingPortal);
  const [openDrop, anchorRef] = useDrop<any>(
    ({ handleClose }) => {
      return (
        <Drop
          ref={dropRef}
          handleClose={handleClose}
          onItemClick={onOptionClick}
        />
      );
    },
    {
      deps: [],
      placement: 'bottom-start',
      blurResistant: true,
      tailored: false,
      portal,
      style: { width: '250px', marginTop: '2px' },
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const closeDropRef = useRef<() => void | void>();
  const stableRef = useMemo(
    () => mergeRefs([inputRef, anchorRef]),
    [inputRef, anchorRef]
  );
  const handleClose = useCallback(() => {
    closeDropRef.current?.();
  }, []);

  const handleOpen = useCallback(() => {
    closeDropRef.current = openDrop();
  }, [openDrop, index]);

  const onOptionClick = useCallback(
    (value: string) => {
      handleClose();
      const key =
        typeof item.value === 'string'
          ? 'value'
          : typeof item.operator === 'string'
          ? 'operator'
          : 'key';
      updateSegment(index, key, value);
      if (key === 'key') {
        updateSegment(index, 'operator', '');
      }
      if (key === 'operator') {
        updateSegment(index, 'value', '');
      }
      if (key === 'value') {
        setEditingIndex(-1);
      } else {
        setEditingIndex(index);
      }
    },
    [index, item]
  );
  const onItemClick = useCallback(() => {
    setEditingIndex(index);
  }, [index, item, handleOpen]);

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [editingIndex, item]);

  const onBlur = ev => {
    if (
      !ev.relatedTarget ||
      !dropRef.current ||
      !dropRef.current.contains(ev.relatedTarget)
    ) {
      handleClose();
      const key =
        typeof item.value === 'string'
          ? 'value'
          : typeof item.operator === 'string'
          ? 'operator'
          : 'key';

      if (ev.target.value && item.operator && key === 'key') {
        setEditingIndex(undefined);
      }
    }
  };

  useEffect(() => {
    const onFocus = ev => {
      handleOpen();
    };

    const onKeydown = ev => {
      if (
        ev.key === 'Backspace' &&
        ev.target.selectionStart === 0 &&
        !ev.target.value
      ) {
        if (typeof item.value === 'string') {
          updateSegment(index, 'value', undefined);
          return;
        }
        if (typeof item.operator === 'string') {
          updateSegment(index, 'operator', undefined);
          return;
        }
        setEditingIndex(index - 1);
        removeSegment(index);
        return;
      }
      if (
        ev.key === 'Backspace' &&
        ev.target.selectionStart === 1 &&
        editingIndex === 0 &&
        !item.value &&
        !item.operator
      ) {
        setEditingIndex(-1);
        removeSegment(index);
      }
    };
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', onFocus);
      inputRef.current.addEventListener('keydown', onKeydown);
      inputRef.current.addEventListener('blur', onBlur);
    }
    return () => {
      inputRef.current?.removeEventListener('focus', onFocus);
      inputRef.current?.removeEventListener('keydown', onKeydown);
      inputRef.current?.removeEventListener('blur', onBlur);
    };
  }, [inputRef.current, editingIndex]);
  return (
    <li {...props} sx={{ display: 'flex', mr: 1 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 0,
          mr: 1,
          alignItems: 'center',
        }}
        onClick={onItemClick}
      >
        {Object.entries(item)
          .filter(([_, tokenValue]) => typeof tokenValue === 'string')
          .map(([token, tokenValue], itemIndex, arr) => {
            if (editingIndex === index && itemIndex === arr.length - 1) {
              return null;
            } else {
              if (token === 'value') {
                return (
                  <SegmentToken key={token}>
                    {propose?.renderSelection
                      ? propose?.renderSelection?.(tokenValue)
                      : tokenValue}
                  </SegmentToken>
                );
              }
              if (token === 'operator') {
                const operator = propose?.operators.find(
                  opr => opr.key === tokenValue
                );
                return (
                  <SegmentToken key={token}>{operator?.label}</SegmentToken>
                );
              }

              return <SegmentToken key={token}>{propose?.label}</SegmentToken>;
            }
          })}
      </Box>
      <SegmentInput
        key={hash(item)}
        ref={stableRef}
        editing={editing}
        item={item}
        portal={portal}
      />
    </li>
  );
};
