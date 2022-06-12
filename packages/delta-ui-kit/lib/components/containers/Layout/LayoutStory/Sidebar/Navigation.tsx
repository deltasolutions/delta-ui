import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import {
  LayoutNavigation,
  LayoutNavigationContent,
  LayoutNavigationGroup,
  LayoutNavigationItem,
} from '../../LayoutNavigation';

const items = [
  {
    items: [{ title: 'Power' }, { title: 'Media' }, { title: 'Indication' }],
    group: 'Control',
  },
  {
    items: [
      { title: 'Server Authorizatuin' },
      { title: 'Location' },
      { title: 'Network' },
      { title: 'Firmware' },
      { title: 'SNMP' },
      { title: 'Ssl' },
      { title: 'Ntp' },
      { title: 'Fans' },
      { title: 'Notifications' },
      { title: 'User Interface' },
    ],
    group: 'Configuration',
  },
];

export const Navigation = () => {
  const [activeId, setActiveId] = useState('/dashboard');
  const [query, setQuery] = useState('');
  return (
    <LayoutNavigation activeId={activeId}>
      <LayoutNavigationItem
        href="#"
        icon={MdOutlineSpaceDashboard}
        id="/dashboard"
        onClick={() => setActiveId('/dashboard')}
      >
        Dashboard
      </LayoutNavigationItem>
      <LayoutNavigationContent>
        {items
          .map(node => {
            return node.group
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
              ? node
              : {
                  ...node,
                  items: node.items.filter(i =>
                    i.title
                      .toLocaleLowerCase()
                      .includes(query.toLocaleLowerCase())
                  ),
                };
          })
          .filter(node => node.items.length > 0)
          .map((node, index) => {
            return (
              <LayoutNavigationGroup key={index} title={node.group}>
                {node.items.map((item, index) => {
                  return (
                    <LayoutNavigationItem
                      key={index}
                      href="#"
                      id={item.title}
                      onClick={() => setActiveId(item.title)}
                    >
                      {item.title}
                    </LayoutNavigationItem>
                  );
                })}
              </LayoutNavigationGroup>
            );
          })}
      </LayoutNavigationContent>
    </LayoutNavigation>
  );
};
