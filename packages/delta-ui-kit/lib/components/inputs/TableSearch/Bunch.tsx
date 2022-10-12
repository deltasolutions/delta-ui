import { jsx } from '@theme-ui/core';
import { lighten } from 'polished';
import { useCallback, useContext } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useDeltaTheme } from '../../../hooks';
import { Box } from '../../containers';
import { TableSearchContext } from './contexts';
import { SearchInput } from './SearchInput';
import { BunchData } from './types';

export interface BunchProps {
  bunch: BunchData;
  index: number;
}

export const Bunch = ({ bunch, index: bunchIndex }: BunchProps) => {
  const {
    proposes,
    currentEditingIndex,
    setCurrentEditingIndex,
    onBunchRemove,
    setValue: setBunches,
  } = useContext(TableSearchContext);
  const { colors } = useDeltaTheme();
  const propose = proposes.find(p => p.id === bunch.id);
  const editing = currentEditingIndex === bunchIndex;
  const onItemClick = useCallback(
    (v, item) => {
      if (item === 'value') {
        setCurrentEditingIndex(undefined);
      }
      setBunches(prev => {
        const next = [...prev];
        next[bunchIndex] = {
          ...next[bunchIndex],
          ...{
            id: { [item]: v, operator: '' },
            operator: { [item]: v, value: '' },
            value: { [item]: v },
          }[item],
        };
        return next;
      });
    },
    [bunchIndex]
  );
  const onKeyDown = useCallback(
    (index, item, ev) => {
      if (ev.key === 'Backspace') {
        if ((ev.target as any).selectionStart === 0) {
          if (index === 0) {
            onBunchRemove(bunchIndex);
          } else {
            setBunches(prev => {
              const next = prev ? [...prev] : [];
              next[bunchIndex] = {
                ...next[bunchIndex],
                [item]: undefined,
              };
              return next;
            });
          }
        }
      }
    },
    [bunchIndex]
  );
  return (
    <li sx={{ display: 'flex', flexShrink: 0 }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
        onDoubleClick={() => {
          setCurrentEditingIndex(bunchIndex);
        }}
      >
        {Object.entries(bunch)
          .filter(([key, value]) => typeof value === 'string' || key === 'id')
          .map(([key]) => key)
          .map((item: 'id' | 'operator' | 'value', index, arr) => {
            if (editing && index === arr.length - 1) {
              return (
                <SearchInput
                  key={item}
                  autoFocus={true}
                  bunch={bunch}
                  editingItem={item}
                  type={propose?.type}
                  value={bunch[item]}
                  onBlur={ev => {
                    if (item === 'value' && ev.target.selectionStart !== 0) {
                      setCurrentEditingIndex(null);
                    }
                  }}
                  onChange={v => {
                    setBunches(prev => {
                      const next = [...prev];
                      next[bunchIndex] = { ...next[bunchIndex], [item]: v };
                      return next;
                    });
                  }}
                  onItemClick={v => onItemClick(v, item)}
                  onKeyDown={ev => onKeyDown(index, item, ev)}
                />
              );
            }
            if (item === 'id') {
              return (
                <span
                  key={item}
                  id={item}
                  sx={{
                    backgroundColor: lighten(0.03, colors.accentContext),
                    px: '6px',
                    py: '2px',
                  }}
                >
                  {bunch.id}
                </span>
              );
            }
            if (item === 'operator') {
              return (
                <span
                  key={item}
                  sx={{
                    px: '6px',
                  }}
                >
                  {bunch.operator}
                </span>
              );
            }
            if (item === 'value') {
              return (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    {propose?.renderSelection({
                      value: bunch.value,
                      id: bunch.id,
                    })}
                  </Box>
                  <Box
                    sx={{
                      zIndex: 1,
                      marginLeft: 1,
                      borderRadius: '100%',
                      aspectRatio: '1/1',
                      '&:hover, &:focus-visible': {
                        cursor: 'pointer',
                        backgroundColor: 'accentContext',
                        color: 'accentOnContext',
                      },
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      onBunchRemove(bunchIndex, true);
                    }}
                  >
                    <IoIosClose
                      sx={{
                        width: '1.4em',
                        height: '1.4em',
                        transform: 'scale(1.2)',
                        verticalAlign: 'middle',
                      }}
                    />
                  </Box>
                </Box>
              );
            }
            return null;
          })}
      </Box>
    </li>
  );
};
