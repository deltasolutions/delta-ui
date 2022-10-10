import { jsx } from '@theme-ui/core';
import { lighten } from 'polished';
import { useContext, useEffect, useState } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Box } from '../../containers';
import { TableSearchContext } from './TableSearchContext';

export const TableSearchSelection = ({ id, index, arr, removing, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<unknown>();
  const { colors } = useDeltaTheme();
  const { renderSelectialOperator, items, setItems, queryables } =
    useContext(TableSearchContext);
  useEffect(() => {
    const maybeInput = id?.slice(0, 6) === '_query';
    if (maybeInput) {
      setValue(id.split(':').at(-1));
      return;
    }
    if (id.includes('|')) {
      const operator = id.split('|').at(-1);
      setValue(renderSelectialOperator?.(operator) ?? operator);
      return;
    }
    const queryable = queryables?.find(q => q.id === id);
    if (queryable) {
      setValue(queryable.label ?? '');
      return;
    }
    const itemQueryableId = arr[index - 1].split('|')[0];
    if (itemQueryableId) {
      const queryable = queryables?.find(q => q.id === itemQueryableId);
      const datum = items[itemQueryableId]?.find((i: any) => i.id === id);
      if (datum) {
        setValue(queryable?.renderSelection(datum));
        return;
      } else {
        const maybeItems = queryable?.getItems('');
        if (Array.isArray(maybeItems)) {
          const datum = maybeItems.find((i: any) => i.id === id);
          setValue(queryable?.renderSelection(datum));
          return;
        } else {
          if (!loading) {
            setLoading(true);
            maybeItems
              ?.then(items => {
                const datum = items.find((i: any) => i.id === id);
                if (datum) {
                  setValue(queryable?.renderSelection(datum));
                }
                setItems(prev => ({ ...prev, [queryable!.id]: items }));
              })
              .finally(() => {
                setLoading(false);
              });
            return;
          }
        }
        setValue('...');
        return;
      }
    }
  }, [id]);

  return (
    <Box
      style={{
        opacity: removing ? 0.5 : 1,
        marginLeft:
          index === 0 ||
          arr[index - 1]?.includes('|') ||
          id.split('|').length === 2
            ? 0
            : 8,
      }}
      sx={{
        px: 2,
        py: '2px',
        backgroundColor: lighten(0.065, colors.accentContext),
      }}
      {...rest}
    >
      {value}
    </Box>
  );
};
