import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoTrashBinOutline } from 'react-icons/io5';
import { Button, useModal } from 'restyler';
import { DataTableContext } from '../../DataTableContext';

export const RemoveButton = () => {
  const [t] = useTranslation();
  const { manager } = useContext(DataTableContext);
  const { openQuestion } = useModal();
  const handleClick = useCallback(() => {
    openQuestion({
      heading: t('common:questions.tabRemoval.heading'),
      content: t('common:questions.tabRemoval.content')
    }).then(shouldContinue => {
      if (!shouldContinue) {
        return;
      }
      manager.removeTab(manager.activeTabName);
    });
  }, [openQuestion, manager]);
  return (
    <Button kind="icon" onClick={handleClick}>
      <IoTrashBinOutline />
    </Button>
  );
};
