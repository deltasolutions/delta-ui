import { jsx } from '@theme-ui/core';
import { forwardRef, Fragment, ReactNode } from 'react';
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
    return (
      <Box ref={ref} {...rest}>
        <QuestionHeader>
          <Heading level={4}>{heading}</Heading>
        </QuestionHeader>
        <QuestionBody>{content}</QuestionBody>
        <QuestionFooter>
          {/* TODO: Translate default text. */}
          <Button variant="text" onClick={() => onClose?.(false)}>
            {cancelText ?? 'Cancel'}
          </Button>
          <Button variant="contained" onClick={() => onClose?.(true)}>
            {okText ?? 'OK'}
          </Button>
        </QuestionFooter>
      </Box>
    );
  }
);
