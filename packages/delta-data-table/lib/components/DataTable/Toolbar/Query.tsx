import { jsx } from '@theme-ui/core';
import { useTranslation } from 'react-i18next';
import { useThemed } from 'restyler';

export const Query = () => {
  const [t] = useTranslation();
  const ThemedQuery = useThemed('input', 'dataTable.query');
  return <ThemedQuery placeholder={t('common:labels.search')} />;
};
