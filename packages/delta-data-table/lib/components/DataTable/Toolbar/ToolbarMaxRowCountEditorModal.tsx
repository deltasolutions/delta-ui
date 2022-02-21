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
import { DataTableManager } from '../../../models';

export interface ToolbarMaxRowCountEditorModalProps extends ModalRendererProps {
  manager: DataTableManager<any>;
}

export const ToolbarMaxRowCountEditorModal = ({
  manager: {
    layout: { tabs, maxRowCount },
    setLayout
  },
  handleClose
}: ToolbarMaxRowCountEditorModalProps) => {
  const [t] = useTranslation('common');
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
        <Heading kind="modal">{t('sections.maxRowCountEditor')}</Heading>
      </ModalHeader>
      <ModalBody>
        <FormField
          name="maxRowCount"
          label={t('labels.maxRowCount')}
          validate={v => (v && +v > 0 ? [] : [t('errors.wrongFormat')])}
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
