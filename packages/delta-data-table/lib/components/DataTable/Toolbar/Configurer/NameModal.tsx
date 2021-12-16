import { jsx } from '@theme-ui/core';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  FormField,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps,
  useFormManager
} from 'restyler';
import { DataTableManager } from '../../../../models';

export interface NameModalProps extends ModalRendererProps {
  dataTableManager: DataTableManager<any>;
}

export const NameModal = ({
  dataTableManager: {
    layout: { tabs },
    activeTabName,
    setActiveTabName,
    updateActiveTab
  },
  handleClose
}: NameModalProps) => {
  const [t] = useTranslation();
  const formManager = useFormManager({
    values: { name: activeTabName }
  });
  return (
    <Form
      manager={formManager}
      onSubmit={({ values: { name } }) => {
        setActiveTabName(name);
        updateActiveTab({ name });
        handleClose();
      }}
    >
      <ModalHeader>
        <Heading kind="modal">{t('common:sections.tabName')}</Heading>
      </ModalHeader>
      <ModalBody>
        <FormField
          required
          name="name"
          label={t('common:labels.tabName')}
          validate={v =>
            v && v !== activeTabName && tabs.some(({ name }) => v == name)
              ? [t('common:errors.wrongFormat')]
              : []
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={handleClose}>
          {t('actions.close')}
        </Button>
        <Button kind="primary" type="submit">
          {t('actions.apply')}
        </Button>
      </ModalFooter>
    </Form>
  );
};
