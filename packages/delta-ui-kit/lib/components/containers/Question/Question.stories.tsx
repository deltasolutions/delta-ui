import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Button,
  Heading,
  Question,
  QuestionBody,
  QuestionFooter,
  QuestionHeader,
} from '../..';

export default {
  title: 'Containers/Question',
} as Meta;

export const Basics = () => {
  return (
    <Question>
      <QuestionHeader>
        <Heading level={3}>Header</Heading>
      </QuestionHeader>
      <QuestionBody>Body</QuestionBody>
      <QuestionFooter>
        <Button variant="text">Cancel</Button>
        <Button variant="contained">OK</Button>
      </QuestionFooter>
    </Question>
  );
};
