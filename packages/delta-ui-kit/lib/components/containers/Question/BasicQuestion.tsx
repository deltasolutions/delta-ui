import { jsx } from '@theme-ui/core';
import { forwardRef, Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../Button';
import { Box, BoxProps } from '../Box';
import { Heading } from '../Heading';
import { QuestionBody } from './QuestionBody';
import { QuestionFooter } from './QuestionFooter';
import { QuestionHeader } from './QuestionHeader';

export interface BasicQuestionProps extends Omit<BoxProps, 'children'> {
  content: ReactNode;
  heading: ReactNode;
  okText?: string;
  cancelText?: string;
  onClose?: (output: boolean) => void;
}

export const BasicQuestion = forwardRef<HTMLDivElement, BasicQuestionProps>(
  ({ heading, content, okText, cancelText, onClose, ...rest }, ref) => {
    const [t] = useTranslation('common');
    return (
      <Box ref={ref} {...rest}>
        <QuestionHeader>
          <Heading level={4}>{heading}</Heading>
        </QuestionHeader>
        <QuestionBody>{content}</QuestionBody>
        <QuestionFooter>
          <Button variant="text" onClick={() => onClose?.(false)}>
            {cancelText ?? t('actions.cancel')}
          </Button>
          <Button variant="contained" onClick={() => onClose?.(true)}>
            {okText ?? t('actions.ok')}
          </Button>
        </QuestionFooter>
      </Box>
    );
  }
);
