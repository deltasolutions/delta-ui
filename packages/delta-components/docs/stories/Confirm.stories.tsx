import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Button,
  Question,
  QuestionBody,
  QuestionFooter,
  QuestionHeader,
} from '../../lib';

export default {
  title: 'Containers/Question',
} as Meta;

export const Basics = () => {
  return (
    <Question>
      <QuestionHeader>Header</QuestionHeader>
      <QuestionBody>Body</QuestionBody>
      <QuestionFooter>
        <Button variant="text">Cancel</Button>
        <Button variant="contained">OK</Button>
      </QuestionFooter>
    </Question>
  );
};
