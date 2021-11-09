import { jsx } from '@theme-ui/core';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Checkbox,
  Form,
  FormField,
  FormGrid,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps,
  useFormManager
} from 'restyler';
import { DataTableManager } from '../../../models';

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
    values: {
      stretched: maxRowCount === undefined,
      maxRowCount: maxRowCount
    }
  });
  return (
    <Form
      manager={formManager}
      onSubmit={({ values: { stretched, maxRowCount } }) => {
        setLayout({
          tabs,
          maxRowCount: stretched ? undefined : +maxRowCount
        });
        handleClose();
      }}
    >
      <ModalHeader>
        <Heading kind="modal">{t('common:sections.rows')}</Heading>
      </ModalHeader>
      <ModalBody>
        <FormGrid>
          <FormField name="stretched">
            <Checkbox>{t('common:labels.stretched')}</Checkbox>
          </FormField>
          {!formManager.values.stretched && (
            <FormField
              name="maxRowCount"
              label={t('common:labels.maxRowCount')}
              validate={v =>
                v && +v > 1 ? [] : [t('common:errors.wrongFormat')]
              }
            >
              <Input type="number" />
            </FormField>
          )}
        </FormGrid>
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
