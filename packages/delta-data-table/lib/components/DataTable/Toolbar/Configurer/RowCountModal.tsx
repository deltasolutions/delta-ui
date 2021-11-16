import { jsx } from '@theme-ui/core';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  FormField,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps,
  useFormManager
} from 'restyler';
import { DataTableManager } from '../../../../models';

export interface RowCountModalProps extends ModalRendererProps {
  dataTableManager: DataTableManager<any>;
}

export const RowCountModal = ({
  dataTableManager: {
    layout: { tabs, maxRowCount },
    setLayout
  },
  handleClose
}: RowCountModalProps) => {
  const [t] = useTranslation();
  const formManager = useFormManager({
    values: { maxRowCount }
  });
  return (
    <Form
      manager={formManager}
      onSubmit={({ values }) => {
        setLayout({ tabs, maxRowCount: +values.maxRowCount });
        handleClose();
      }}
    >
      <ModalHeader>
        <Heading kind="modal">{t('common:sections.rows')}</Heading>
      </ModalHeader>
      <ModalBody>
        <FormField
          name="maxRowCount"
          label={t('common:labels.maxRowCount')}
          validate={v => (v && +v > 0 ? [] : [t('common:errors.wrongFormat')])}
        >
          <Input type="number" />
        </FormField>
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
