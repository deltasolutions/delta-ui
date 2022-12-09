import { jsx } from '@theme-ui/core';
import { Children, forwardRef, ReactElement, ReactNode } from 'react';
import { IoHome } from 'react-icons/io5';
import { TbChevronRight } from 'react-icons/tb';
import { Anchor, AnchorProps } from '../Anchor';
import { Box, BoxProps } from '../containers';

export interface BreadcrumbsProps extends BoxProps {}

export const Breadcrumbs = ({ children, ...rest }: BreadcrumbsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontSize: 2,
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
                  width: '1.15em',
                  height: '1.15em',
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
  return (
    <Anchor
      ref={ref}
      sx={{
        fontWeight: 'light',
        verticalAlign: 'middle',
        letterSpacing: '0.04em',
      }}
      variant="pure"
      {...props}
    />
  );
});

export const BreadcrumbsHome = forwardRef<
  HTMLAnchorElement,
  BreadcrumbsItemProps
>((props: Omit<BreadcrumbsItemProps, 'children'>, ref) => {
  return (
    <BreadcrumbsItem ref={ref} {...props}>
      <IoHome
        sx={{
          width: '1.45em',
          height: '1.45em',
          verticalAlign: 'middle',
        }}
      />
    </BreadcrumbsItem>
  );
});
