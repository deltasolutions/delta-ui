import { jsx } from '@theme-ui/core';
import { createContext } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Button, ButtonProps } from '../Button';
import { Box, BoxProps } from '../containers';

export interface PaginationProps extends BoxProps {
  onChange: (page) => void;
  prevButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
  currentPage: number;
  pages: number;
}

export const Pagination = ({
  children,
  nextButtonProps,
  prevButtonProps,
  onChange,
  currentPage,
  pages,
  ...rest
}: PaginationProps) => {
  let arr = Array.from(Array(pages).keys()).map(i => i + 1);
  arr = [
    ...arr.slice(0, currentPage).reverse().slice(0, 2).reverse(),
    ...arr.slice(currentPage, currentPage + 1),
  ];
  return (
    <PaginationContext.Provider value={{ pages, currentPage, onChange }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
        {...rest}
      >
        <Item
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          <MdKeyboardArrowLeft size={21} />
        </Item>
        {arr.map(i => (
          <Item
            key={i}
            isActive={i === currentPage}
            sx={{ px: 3 }}
            onClick={() => onChange(i)}
          >
            {i}
          </Item>
        ))}

        <Item
          disabled={currentPage === pages}
          onClick={() => onChange(currentPage + 1)}
        >
          <MdKeyboardArrowRight size={21} />
        </Item>
      </Box>
    </PaginationContext.Provider>
  );
};
const Item = ({ children, disabled = false, isActive = false, ...rest }) => (
  <Button
    disabled={disabled}
    sx={{
      justifyContent: 'center',
      borderRadius: 4,
      px: 2,
      height: '28px',
      ...(!disabled && {
        '&:hover, &:active, &:focus-visible': {
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
      }),
      ...(isActive && {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'accentOnContext',
      }),
    }}
    {...rest}
  >
    {children}
  </Button>
);

const PaginationContext = createContext(
  {} as { pages: number; currentPage: number; onChange: (v: number) => void }
);
