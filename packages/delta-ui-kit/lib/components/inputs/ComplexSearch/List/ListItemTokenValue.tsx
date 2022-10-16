import { jsx } from '@theme-ui/core';
import { useContext, useEffect, useMemo } from 'react';
import { BoxProps } from '../../../containers';
import { Skeleton } from '../../../displays';
import { ComplexSearchContext } from '../contexts';
import { ListItemToken } from './ListItemToken';

export interface ListItemTokenValueProps extends BoxProps {
  value: string;
}
export const ListItemTokenValue = ({ id, value }: ListItemTokenValueProps) => {
  const { proposes, itemsValueOptions, fetchItemValueOptions } =
    useContext(ComplexSearchContext);
  const propose = useMemo(
    () => proposes.find(p => p.id === id),
    [proposes, id]
  );
  if (!propose) {
    return <span>{value}</span>;
  }
  const maybeItems = itemsValueOptions[propose.id];
  const item =
    maybeItems !== 'loading' &&
    maybeItems?.find((i: { id: string }) => i.id === value);
  useEffect(() => {
    if (maybeItems !== 'loading' && !Array.isArray(maybeItems)) {
      fetchItemValueOptions(propose.id, '');
    }
  }, [maybeItems]);

  if (item) {
    return <ListItemToken>{propose?.renderSelectial(item)}</ListItemToken>;
  }
  if (!Array.isArray(maybeItems)) {
    return (
      <ListItemToken sx={{ width: '100px', height: '1.5em' }}>
        <Skeleton />
      </ListItemToken>
    );
  }
  return <ListItemToken>{value}</ListItemToken>;
};
