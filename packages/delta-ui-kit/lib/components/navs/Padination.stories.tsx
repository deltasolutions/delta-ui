import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Pagination } from './Pagination';

export default {
  title: 'Navs/Pagination',
} as Meta;

export const Basics = () => {
  const [active, setActive] = useState(1);
  const pages = 1000;
  const itemsPerPage = 20;
  const pagesLength = Math.ceil(pages / itemsPerPage);
  const onChage = v => {
    setActive(v);
  };
  return (
    <Pagination currentPage={active} pages={pagesLength} onChange={onChage} />
  );
};
