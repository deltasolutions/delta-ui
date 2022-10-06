import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import { forwardRef, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DropRendererProps } from '../../../hooks';
import { DropMenu, DropMenuItem } from '../DropMenu';
import { TableSearchContext } from './TableSearchContext';

export interface TableSearchDropProps extends DropRendererProps {}

export const TableSearchDrop = forwardRef<HTMLDivElement, TableSearchDropProps>(
  ({ handleClose, ...rest }, ref) => {
    const [t] = useTranslation('common');
    const {
      selections,
      handleAddition,
      queryables,
      items,
      loading,
      handleRemoval,
      options,
    } = useContext(TableSearchContext);
    const render = id => {
      if (id.slice(0, 6) === '_query') {
        return t('actions.searchForThisText');
      }
      const isItem = (selections.at(-1) as string)?.includes('|') ?? '';
      if (isItem && !loading) {
        const key = (selections.at(-1) as string).split('|')[0];
        const queryable = queryables?.find(q => q.id === key);
        return queryable?.renderOption(
          items[key]?.find((i: any) => i.id === id)
        );
      }
      if (id.includes('|')) {
        return id.split('|')[1];
      }
      const queryable = queryables?.find(q => q.id === id);
      if (queryable) {
        return queryable?.label;
      }
      return id;
    };
    return (
      <Fragment>
        <DropMenu
          ref={ref}
          handleClose={handleClose}
          selectedValues={selections}
          onItemClick={v => {
            selections.includes(v) ? handleRemoval(v) : handleAddition(v);
          }}
          {...rest}
        >
          {options.map((id: string) => {
            return (
              <DropMenuItem key={hash(id)} value={id}>
                {render(id)}
              </DropMenuItem>
            );
          })}
        </DropMenu>
      </Fragment>
    );
  }
);
