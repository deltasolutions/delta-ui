import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from './Box';
import { Scroll } from './Scroll';

export default {
  title: 'Containers/Scroll',
} as Meta;

export const Basics = () => (
  <Box sx={{ px: 5 }}>
    <Scroll sx={{ height: '50px' }}>
      <Box sx={{ whiteSpace: 'nowrap' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, animi
        dignissimos similique id exercitationem quaerat consectetur explicabo
        modi nulla ad eos, blanditiis voluptate asperiores eius cumque sed aut
        obcaecati amet! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Et eveniet nesciunt excepturi! Unde, tempora nostrum assumenda quae
        quidem corrupti ipsum ea voluptatibus recusandae. Id sit, modi autem
        quas dolores amet!
      </Box>
    </Scroll>
  </Box>
);
