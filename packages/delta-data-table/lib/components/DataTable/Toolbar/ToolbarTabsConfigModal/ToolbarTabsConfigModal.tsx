import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps
} from 'restyler';

export interface ToolbarTabsConfigModalProps extends ModalRendererProps {}

export const ToolbarTabsConfigModal = ({
  handleClose
}: ToolbarTabsConfigModalProps) => {
  const [t] = useTranslation('common');
  return (
    <Fragment>
      <ModalHeader>
        <Heading kind="modal">{t('sections.tabsConfig')}</Heading>
      </ModalHeader>
      <ModalBody>TABS</ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <Button kind="primary">{t('actions.save')}</Button>
      </ModalFooter>
    </Fragment>
  );
};
