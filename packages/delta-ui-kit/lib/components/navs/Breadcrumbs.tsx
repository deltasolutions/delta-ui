import { jsx } from '@theme-ui/core';
import { Children, forwardRef, ReactElement, ReactNode } from 'react';
import { ImHome } from 'react-icons/im';
import { RiHomeFill } from 'react-icons/ri';
import { TbChevronRight } from 'react-icons/tb';
import { VscChevronRight } from 'react-icons/vsc';
import { Anchor, AnchorProps } from '../Anchor';
import { Box, BoxProps } from '../containers';

export interface BreadcrumbsProps extends BoxProps {}

export const Breadcrumbs = ({ children, ...rest }: BreadcrumbsProps) => {
  return (
    <Box
      sx={{
        pl: 1,
        pr: 3,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontSize: 3,
        borderRadius: '100vw',
        backgroundColor: 'accentContext',
        color: 'onContext',
      }}
      {...rest}
    >
      {(Children.toArray(children) as ReactElement[])
        ?.reduce(
          (p, v, i) => [
            ...p,
            i > 0 ? (
              <TbChevronRight
                key={i}
                sx={{
                  whiteSpace: 'nowrap',
                  width: '1.25em',
                  height: '1.25em',
                }}
              />
            ) : null,
            v,
          ],
          [] as ReactNode[]
        )
        .filter(Boolean)}
    </Box>
  );
};

export interface BreadcrumbsItemProps extends Omit<AnchorProps, 'variant'> {}

export const BreadcrumbsItem = forwardRef<
  HTMLAnchorElement,
  BreadcrumbsItemProps
>((props: BreadcrumbsItemProps, ref) => {
  return <Anchor ref={ref} variant="pure" {...props} />;
});

export const BreadcrumbsHome = forwardRef<
  HTMLAnchorElement,
  BreadcrumbsItemProps
>((props: Omit<BreadcrumbsItemProps, 'children'>, ref) => {
  return (
    <BreadcrumbsItem ref={ref} {...props}>
      <Box
        sx={{
          width: '1.5rem',
          height: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'onContext',
          borderRadius: '100vw',
          '&:hover': {
            backgroundColor: 'accentOnContext',
          },
        }}
      >
        <RiHomeFill
          sx={{
            width: '1rem',
            height: '1rem',
            color: 'accentContext',
          }}
        />
      </Box>
    </BreadcrumbsItem>
  );
});
