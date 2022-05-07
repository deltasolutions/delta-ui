import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { BsThreeDots } from 'react-icons/bs';
import {
  Dropdown,
  DropdownItem,
  Box,
  ICON_MEDIUM_SIZE,
  Button,
  Anchor,
  Tooltip
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
          <Button>
            <BsThreeDots size={ICON_MEDIUM_SIZE} />
          </Button>
        }
      >
        <DropdownItem divide>
          <Anchor href="#">Add to stories</Anchor>
        </DropdownItem>
        <DropdownItem>
          <Anchor href="#">Go to stories</Anchor>
        </DropdownItem>
        <DropdownItem>
          <Anchor href="#">Go to settings</Anchor>
        </DropdownItem>
        <DropdownItem divide>
          <Anchor href="#">Save to bookmarks</Anchor>
        </DropdownItem>
        <Dropdown divide label="Share">
          <DropdownItem divide>
            <Anchor href="#">Mail</Anchor>
          </DropdownItem>
          <Dropdown label="Preferences">
            <DropdownItem>
              <Anchor href="#">Reddit</Anchor>
            </DropdownItem>
            <DropdownItem>
              <Anchor href="#">LinkedIn</Anchor>
            </DropdownItem>
          </Dropdown>
          <Dropdown label="Other">
            <DropdownItem>
              <Anchor href="#">Reddit</Anchor>
            </DropdownItem>
            <Dropdown label="Other">
              <DropdownItem>
                <Anchor href="#">Reddit</Anchor>
              </DropdownItem>
              <Dropdown label="Other">
                <DropdownItem>
                  <Anchor href="#">Reddit</Anchor>
                </DropdownItem>
                <Dropdown label="Other">
                  <DropdownItem>
                    <Anchor href="#">Reddit</Anchor>
                  </DropdownItem>
                  <DropdownItem>
                    <Anchor href="#">LinkedIn</Anchor>
                  </DropdownItem>
                </Dropdown>
              </Dropdown>
            </Dropdown>
          </Dropdown>
        </Dropdown>
        <DropdownItem divide>
          <Anchor href="#">Open is new page</Anchor>
        </DropdownItem>
        <DropdownItem>
          <Anchor href="#">Show advanced settings</Anchor>
        </DropdownItem>
      </Dropdown>
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
