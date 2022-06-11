import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import FocusTrap from 'focus-trap-react';
import {
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEnter } from 'react-icons/ai';
import { HiChevronRight } from 'react-icons/hi';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Theme } from '../../defaults';
import { DropRendererProps, useDrop, useImperativePortal } from '../../hooks';
import { Button, ButtonProps } from '../Button';
import { Box, BoxProps, Option, SystemContext } from '../containers';
import { TextInput } from '../inputs';

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
  const [tCommon] = useTranslation('common');
  const { floatingPortal } = useContext(SystemContext);
  const portal = useImperativePortal(floatingPortal);

  const [openDrop, anchorRef] = useDrop<HTMLButtonElement>(
    props => <PaginationDrop {...props} />,
    { deps: [], portal, placement: 'top-start' }
  );
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
        color: 'accentOnSurface',
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

const PaginationDrop = forwardRef<HTMLDivElement, DropRendererProps>(
  ({ handleClose }, propsRef) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [inputValue, setInputValue] = useState<string>();
    const {
      colors: { monkaS },
    } = useTheme() as Theme;
    const { pages, currentPage, onChange } = useContext(PaginationContext);
    const items = Array.from(Array(pages).keys()).map(i => i + 1);
    const final = [
      ...items.slice(0, currentPage).reverse().slice(0, 5).reverse(),
      ...items.slice(currentPage, currentPage + 4),
    ];
    final[0] = 1;
    final[final.length - 1] = pages;
    useLayoutEffect(() => {
      console.log(ref.current?.focus());
    }, []);
    const handleChangePage = useCallback(() => {
      if (!inputValue) {
        return;
      }
      const v = Math.max(Math.min(+inputValue, pages), 0);
      onChange(v);
      setInputValue('');
    }, [inputValue, onChange]);
    return (
      <FocusTrap>
        <Box
          ref={propsRef}
          sx={{
            py: 1,
            'input::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: '0',
            },
          }}
        >
          <TextInput
            endAdornment={
              <Button sx={{ borderRadius: '100%' }} onClick={handleChangePage}>
                <AiOutlineEnter />
              </Button>
            }
            max={pages}
            min={1}
            placeholder={pages.toString()}
            sx={{
              width: '120px',
              px: 1,
              py: 1,
              borderBottom: '1px solid',
              borderBottomColor: 'border',
            }}
            type="number"
            value={inputValue}
            variant="pure"
            onChange={setInputValue}
            onKeyDown={e => {
              if (e.key === 'Enter' && inputValue) {
                handleChangePage();
              }
            }}
          />
          {final.map(i => (
            <Option
              key={i}
              {...(i === currentPage && { ref })}
              style={{
                ...(i == currentPage && {
                  backgroundColor: monkaS,
                  color: 'onPrimary',
                }),
              }}
              sx={{ width: '100%' }}
              onClick={() => onChange(i)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  onChange(i);
                }
                if (e.key === 'Escape') {
                  handleClose();
                }
              }}
            >
              {i}
            </Option>
          ))}
        </Box>
      </FocusTrap>
    );
  }
);
