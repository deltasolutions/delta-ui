import { jsx } from '@theme-ui/core';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemed } from 'restyler';
import { useDebounce } from '../../../hooks';
import { DataTableContext } from '../DataTableContext';

export const ToolbarQuery = () => {
  const [t] = useTranslation('common');
  const ThemedQuery = useThemed('input', 'dataTable.query');
  const {
    manager: { query, setQuery, requestNextChunk }
  } = useContext(DataTableContext);
  const [value, setValue] = useState(query ?? '');
  const valueToQuery = useDebounce(value, 300);
  useEffect(() => {
    if (valueToQuery === query) {
      return;
    }
    setQuery(valueToQuery);
    requestNextChunk({
      // Resetting already loaded pages.
      offset: 0,
      // Passing an override value, since the defalt
      // query value will update only on next render.
      query: valueToQuery
    });
  }, [valueToQuery]);
  useEffect(() => {
    return () => {
      setQuery('');
      requestNextChunk({ offset: 0, query: '' });
    };
  }, []);
  return (
    <ThemedQuery
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={t('labels.search')}
    />
  );
};
