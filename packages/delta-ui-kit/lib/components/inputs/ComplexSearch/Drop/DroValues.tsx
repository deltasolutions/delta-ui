import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DropRendererProps } from '../../../../hooks';
import { Box } from '../../../containers';
import { Loader } from '../../../displays';
import { DropMenu, DropMenuItem } from '../../DropMenu';
import {
  ComplexSearchContext,
  DropContentContext,
  DropContext,
} from '../contexts';
import { ComplexSearchPropose } from '../types';

export interface DropValuesProps extends Partial<DropRendererProps> {
  propose: ComplexSearchPropose;
}

export const DropValues = ({ propose }: DropValuesProps) => {
  const [t] = useTranslation('common');
  const { itemsValueOptions, fetchItemValueOptions } =
    useContext(ComplexSearchContext);
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { query } = useContext(DropContext);
  const items = itemsValueOptions[propose.id];
  useEffect(() => {
    fetchItemValueOptions(propose.id, '');
  }, [propose]);

  if (!Array.isArray(items)) {
    return (
      <Box
        sx={{
          p: 2,
          py: 3,
          pl: 4,
        }}
      >
        <Loader size="small" />
      </Box>
    );
  }
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick}>
      {items
        ?.map(option => (
          <DropMenuItem key={option.id} value={option.id}>
            {propose?.renderOption(option)}
          </DropMenuItem>
        ))
        .concat(
          query
            ? [
                <DropMenuItem key={`query-${query}`} value={query ?? ''}>
                  {t('actions.searchForThisText')}
                </DropMenuItem>,
              ]
            : []
        )
        .filter(Boolean)}
    </DropMenu>
  );
};
