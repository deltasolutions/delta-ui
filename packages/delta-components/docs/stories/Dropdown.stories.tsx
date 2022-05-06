import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { BsThreeDots } from 'react-icons/bs';
import {
  Dropdown,
  DropdownItem,
  AsAnchor,
  Box,
  ICON_MEDIUM_SIZE,
  AsButton
} from '../../lib';

export default {
  title: 'Navigation/Dropdown',
  component: Dropdown
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = args => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
      <Dropdown
        component={
          <AsButton>
            <BsThreeDots size={ICON_MEDIUM_SIZE} />
          </AsButton>
        }
      >
        <DropdownItem>
          <AsAnchor href="#">Profile</AsAnchor>
        </DropdownItem>
        <DropdownItem>
          <AsAnchor href="#">New window</AsAnchor>
        </DropdownItem>
        <DropdownItem divide>
          <AsAnchor href="#">Close Tab</AsAnchor>
        </DropdownItem>
        <Dropdown label="Share">
          <DropdownItem divide>
            <AsAnchor href="#">Mail</AsAnchor>
          </DropdownItem>
          <Dropdown label="Preferences">
            <DropdownItem>
              <AsAnchor href="#">Reddit</AsAnchor>
            </DropdownItem>
            <DropdownItem>
              <AsAnchor href="#">LinkedIn</AsAnchor>
            </DropdownItem>
          </Dropdown>
          <Dropdown label="Other">
            <DropdownItem>
              <AsAnchor href="#">Reddit</AsAnchor>
            </DropdownItem>
            <Dropdown label="Other">
              <DropdownItem>
                <AsAnchor href="#">Reddit</AsAnchor>
              </DropdownItem>
              <Dropdown label="Other">
                <DropdownItem>
                  <AsAnchor href="#">Reddit</AsAnchor>
                </DropdownItem>
                <Dropdown label="Other">
                  <DropdownItem>
                    <AsAnchor href="#">Reddit</AsAnchor>
                  </DropdownItem>
                  <DropdownItem>
                    <AsAnchor href="#">LinkedIn</AsAnchor>
                  </DropdownItem>
                </Dropdown>
              </Dropdown>
            </Dropdown>
          </Dropdown>
        </Dropdown>
      </Dropdown>
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
