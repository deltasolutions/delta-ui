import { jsx } from '@theme-ui/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Input,
  RadioGroup,
  RadioOption,
  Form,
  FormField,
  FormGrid,
  useFormManager,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps
} from 'restyler';
import { FeedManager, FeedSectionDef } from '../../models';

export interface ColumnsModalProps extends ModalRendererProps {
  manager: FeedManager;
  sectionId: string;
}

export const ColumnsModal = ({
  manager: { targetSections, setSectionColumns },
  sectionId,
  handleClose
}: ColumnsModalProps) => {
  const [t] = useTranslation();
  const formDefaults = useMemo(
    () => getFormDefaults(targetSections, sectionId),
    []
  );
  const formManager = useFormManager(formDefaults);
  return (
    <Form
      manager={formManager}
      onSubmit={({ values: { isFixedCountLayout, value } }) => {
        setSectionColumns(
          sectionId,
          isFixedCountLayout ? { count: value } : { minWidth: value + 'px' }
        );
        handleClose();
      }}
    >
      <ModalHeader>
        <Heading kind="modal">
          {t('common:sections.feedSectionColumns')}
        </Heading>
      </ModalHeader>
      <ModalBody>
        <FormGrid>
          <FormField
            name="isFixedCountLayout"
            label={t('common:labels.layoutType')}
          >
            <RadioGroup>
              <RadioOption value={true}>
                {t('common:labels.fixedCount')}
              </RadioOption>
              <RadioOption value={false}>
                {t('common:labels.anyCountThatFit')}
              </RadioOption>
            </RadioGroup>
          </FormField>
          <FormField
            name="value"
            label={
              formManager.values.isFixedCountLayout
                ? t('common:labels.count')
                : t('common:labels.minimumWidth')
            }
            validate={v => (v && +v > 0 ? [] : [t('errors.wrongFormat')])}
          >
            <Input type="number" />
          </FormField>
        </FormGrid>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <Button kind="primary" type="submit">
          {t('actions.apply')}
        </Button>
      </ModalFooter>
    </Form>
  );
};

const getFormDefaults = (sections: FeedSectionDef[], sectionId: string) => {
  const { columns: { count = undefined, minWidth = undefined } = {} } =
    sections.find(v => v.id === sectionId) ?? {};
  return {
    values: {
      isFixedCountLayout: count !== undefined,
      value: count ?? parseFloat(minWidth ?? '0')
    }
  };
};
