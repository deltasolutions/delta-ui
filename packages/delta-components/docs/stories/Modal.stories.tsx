import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useState } from 'react';
import {
  Modal,
  Box,
  ModalHeading,
  ModalBody,
  ModalFooter,
  Heading,
  Tooltip,
  Button,
  Dialog
} from '../../lib';

export default {
  title: 'Dialog/Modal',
  component: Modal
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = args => {
  return (
    <Box>
      <Dialog
        render={({ close }) => (
          <Modal {...args} close={close}>
            <ModalHeading>
              <Heading>Modal heading content!</Heading>
            </ModalHeading>
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                pariatur aut laborum, fugiat accusamus laudantium et voluptates
                quaerat incidunt, iste officia numquam mollitia exercitationem
                consectetur omnis repudiandae libero facere veniam. Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Exercitationem
                expedita itaque cum inventore reprehenderit ad voluptatem
                veritatis aperiam praesentium recusandae debitis ipsam aliquam
                quia facilis voluptatum quis non, corporis nihil?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                sx={{ marginLeft: 'auto' }}
                uppercase
                variant="outlined"
                color="success"
                onClick={close}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )}
      >
        <Button size="medium" uppercase zoomable>
          Open modal
        </Button>
      </Dialog>
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  size: 'medium'
};
