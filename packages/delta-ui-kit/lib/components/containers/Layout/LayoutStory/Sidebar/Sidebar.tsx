import { jsx } from '@theme-ui/core';
import { Anchor } from '../../../../Anchor';
import {
  LayoutSidebar,
  LayoutSidebarHeader,
  LayoutSidebarHeaderLogo,
  LayoutSidebarBody,
} from '../../LayoutSidebar';
import { Navigation } from './Navigation';

export const Sidebar = () => {
  return (
    <LayoutSidebar minWidth={100}>
      <LayoutSidebarHeader>
        <Anchor href="#" variant="pure">
          <LayoutSidebarHeaderLogo src="https://pnggrid.com/wp-content/uploads/2021/04/Coca-Cola-white-logo-1024x319.png" />
        </Anchor>
      </LayoutSidebarHeader>
      <LayoutSidebarBody>
        <Navigation />
      </LayoutSidebarBody>
    </LayoutSidebar>
  );
};
