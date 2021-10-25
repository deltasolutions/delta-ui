import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
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
  ModalRendererProps,
  SystemContext
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
  const { locale } = useContext(SystemContext);
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
        <Heading kind="modal">{locale.columns}</Heading>
      </ModalHeader>
      <ModalBody>
        <FormGrid>
          <FormField name="isFixedCountLayout" label={locale.layoutType}>
            <RadioGroup>
              <RadioOption value={true}>{locale.fixedCount}</RadioOption>
              <RadioOption value={false}>{locale.anyCountThatFit}</RadioOption>
            </RadioGroup>
          </FormField>
          <FormField
            name="value"
            label={
              formManager.values.isFixedCountLayout
                ? locale.count
                : locale.minWidth
            }
            validate={v => (v && +v > 0 ? [] : [locale.wrongFormat])}
          >
            <Input type="number" />
          </FormField>
        </FormGrid>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={handleClose}>
          {locale.cancel}
        </Button>
        <Button kind="primary" type="submit">
          {locale.apply}
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
