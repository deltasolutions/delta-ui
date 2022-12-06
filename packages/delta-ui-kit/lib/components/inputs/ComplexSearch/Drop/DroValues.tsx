import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBoxOpen } from 'react-icons/fa';
import { DropRendererProps, useLoader, useOperation } from '../../../../hooks';
import { Box } from '../../../containers';
import { Loader } from '../../../displays';
import { DropMenu, DropMenuItem } from '../../DropMenu';
import { DropContentContext, DropContext } from '../contexts';
import { ComplexSearchProposal } from '../types';

export interface DropValuesProps extends Partial<DropRendererProps> {
  proposal: ComplexSearchProposal;
}

export const DropValues = forwardRef<HTMLDivElement, DropValuesProps>(
  ({ proposal }, ref) => {
    const [t] = useTranslation('common');
    const loaderId = useMemo(() => Symbol(), []);
    const [loading] = useLoader([loaderId]);
    const { handleClose, onItemClick } = useContext(DropContentContext);
    const [options, setOptions] = useState<string[] | undefined>(undefined);
    const { query } = useContext(DropContext);
    const [handleFetching] = useOperation<string, void>(
      async query => {
        const maybeOptions = proposal.getOptions?.(query);
        if (Array.isArray(maybeOptions)) {
          setOptions(maybeOptions);
        } else {
          const options = await maybeOptions;
          setOptions(options ?? []);
        }
      },
      {
        deps: [],
        loaderIds: [loaderId],
      }
    );

    useEffect(() => {
      handleFetching(query);
    }, [query]);

    if (loading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1,
            height: '40px',
          }}
        >
          <Loader size="small" />
        </Box>
      );
    }
    if (!proposal.getOptions) {
      if (!query) {
        return null;
      }
      return (
        <DropMenu
          ref={ref}
          closeOnEscape={false}
          handleClose={handleClose}
          onItemClick={onItemClick}
        >
          {[
            <DropMenuItem key={`query-${query}`} value={query ?? ''}>
              {t('actions.searchForThisText')}
            </DropMenuItem>,
          ]}
        </DropMenu>
      );
    }

    if (options?.length === 0) {
      return (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40px',
          }}
        >
          <FaBoxOpen size={18} />
        </Box>
      );
    }

    if (!options) {
      return null;
    }

    return (
      <DropMenu
        ref={ref}
        closeOnEscape={false}
        handleClose={handleClose}
        onItemClick={onItemClick}
      >
        {options?.map(option => (
          <DropMenuItem key={option} value={option}>
            {proposal?.renderOption?.(option)}
          </DropMenuItem>
        ))}
      </DropMenu>
    );
  }
);
