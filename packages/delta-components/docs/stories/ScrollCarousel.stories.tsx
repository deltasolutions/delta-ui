import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Paragraph, ScrollCarousel } from '../../lib';

export default {
  title: 'Layout/ScrollCarousel',
  component: ScrollCarousel
} as ComponentMeta<typeof ScrollCarousel>;

const Template: ComponentStory<typeof ScrollCarousel> = args => (
  <Box>
    <ScrollCarousel sx={{ height: '50px' }}>
      <Paragraph sx={{ whiteSpace: 'nowrap' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, animi
        dignissimos similique id exercitationem quaerat consectetur explicabo
        modi nulla ad eos, blanditiis voluptate asperiores eius cumque sed aut
        obcaecati amet! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Et eveniet nesciunt excepturi! Unde, tempora nostrum assumenda quae
        quidem corrupti ipsum ea voluptatibus recusandae. Id sit, modi autem
        quas dolores amet!
      </Paragraph>
    </ScrollCarousel>
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {};
