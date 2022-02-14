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

export interface LocaleModalProps extends ModalRendererProps {
  locales: {
    title: string;
    onClick?: () => void;
  }[];
}

export const LocaleModal = ({ locales, handleClose }: LocaleModalProps) => {
  const [t] = useTranslation();
  return (
    <Fragment>
      <ModalHeader>
        <Heading kind="modal">{t('common:sections.locale')}</Heading>
      </ModalHeader>
      <ModalBody sx={{ display: 'flex', flexDirection: 'column' }}>
        {locales.map(v => (
          <Button
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary'
              },
              '& + &': {
                mt: 2,
                pt: 2,
                borderTop: '1px solid',
                borderTopColor: 'border'
              }
            }}
            key={v.title}
            onClick={() => {
              v.onClick?.();
              handleClose();
            }}
          >
            {v.title}
          </Button>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={handleClose}>
          {t('common:actions.close')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

LocaleModal.displayName = 'LocaleModal';
