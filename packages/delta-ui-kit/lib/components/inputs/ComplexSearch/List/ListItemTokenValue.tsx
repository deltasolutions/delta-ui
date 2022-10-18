import { jsx } from '@theme-ui/core';
import { useContext, useEffect, useMemo } from 'react';
import { BoxProps } from '../../../containers';
import { Skeleton } from '../../../displays';
import { ComplexSearchContext } from '../contexts';
import { ListItemToken } from './ListItemToken';

export interface ListItemTokenValueProps extends BoxProps {
  value: string;
  itemKey?: string;
}
export const ListItemTokenValue = ({
  itemKey,
  value,
}: ListItemTokenValueProps) => {
  const {
    proposals: proposes,
    itemsValueOptions,
    fetchItemValueOptions,
  } = useContext(ComplexSearchContext);
  const propose = useMemo(
    () => proposes.find(p => p.key === itemKey),
    [proposes, itemKey]
  );
  const maybeItems = itemsValueOptions[propose?.key ?? ''];
  const item =
    maybeItems !== 'loading' &&
    maybeItems?.find((i: { id: string }) => i.id === value);

  useEffect(() => {
    if (
      maybeItems !== 'loading' &&
      !Array.isArray(maybeItems) &&
      propose?.getOptions
    ) {
      fetchItemValueOptions(propose.key, '');
    }
  }, [maybeItems]);

  if (!propose?.getOptions) {
    return <ListItemToken>{value}</ListItemToken>;
  }

  if (item) {
    return <ListItemToken>{propose?.renderSelection?.(item)}</ListItemToken>;
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
