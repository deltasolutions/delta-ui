import { jsx } from '@theme-ui/core';
import { Schema } from 'delta-jsf';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../../hooks';
import { Button } from '../../../Button';
import {
  Box,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '../../../containers';
import { JsForm, JsFormManagerOptions, useJsFormManager } from '../JsForm';

interface JsFormModalProps extends Omit<ModalProps, 'onChange'> {
  schema: JsFormManagerOptions['schema'];
  initialValue?: JsFormManagerOptions['initialValue'];
  onChange?: (data: unknown, prevData?: unknown) => void;
}

const JsFormModal = ({
  schema,
  initialValue,
  onChange,
  handleClose,
  ...rest
}: JsFormModalProps) => {
  const [t] = useTranslation('common');
  const manager = useJsFormManager({
    schema: schema ?? {},
    initialValue,
    onSubmit: values => {
      onChange?.(values);
      handleClose?.();
    },
  });
  return (
    <Box
      {...rest}
      sx={{
        overflow: 'auto',
        maxHeight: '90vh',
        '@media screen and (max-height: 800px)': {
          maxHeight: '100vh',
        },
        width: '500px',
        borderRadius: 4,
      }}
    >
      <ModalHeader>
        <Heading level={3}>
          {initialValue ? t('actions.edit') : t('actions.create')}
        </Heading>
      </ModalHeader>
      <ModalBody>
        <JsForm manager={manager} />
      </ModalBody>
      <ModalFooter>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            color="secondary"
            variant="contained-dimmed"
            onClick={handleClose}
          >
            {t('actions.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={async () => await manager.submit()}
          >
            {t('actions.save')}
          </Button>
        </Box>
      </ModalFooter>
    </Box>
  );
};

export const useJsFormModal = ({ schema }) =>
  useModal<Pick<JsFormModalProps, 'initialValue' | 'onChange'>>(
    ({ handleClose, context }) => (
      <JsFormModal handleClose={handleClose} schema={schema} {...context} />
    ),
    {
      deps: [schema],
    }
  );
