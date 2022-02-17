import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  hash,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps
} from 'restyler';

export interface ToolbarColumnsEditorModalProps extends ModalRendererProps {}

export const ToolbarColumnsEditorModal = ({
  handleClose
}: ToolbarColumnsEditorModalProps) => {
  const [t] = useTranslation('common');
  const canSubmit = false;
  return (
    <Fragment>
      <ModalHeader>
        <Heading kind="modal">{t('sections.columnsEditor')}</Heading>
      </ModalHeader>
      <ModalBody>TODO</ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <Button kind="primary" type="submit" disabled={!canSubmit}>
          {t('actions.save')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};
