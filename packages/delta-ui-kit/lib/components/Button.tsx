import { jsx } from '@theme-ui/core';
import {
  ButtonHTMLAttributes,
  ComponentType,
  forwardRef,
  HTMLAttributes,
} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'contained-dimmed' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  icon?: ComponentType<HTMLAttributes<Element>>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      variant,
      color,
      size,
      icon: Icon,
      children,
      disabled,
      type,
      ...rest
    } = props;
    return (
      <button
        ref={ref}
        disabled={disabled}
        sx={{
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
          opacity: 1,
          border: 'none',
          background: 'none',
          color: 'inherit',
          fontSize: 'inherit',
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary',
          },
          ...getSizeStyle(props),
          ...getVariantStyle(props),
        }}
        type={type ?? 'button'}
        {...rest}
      >
        {Icon && (
          <Icon
            sx={{
              width: '1.65em',
              height: '1.65em',
              verticalAlign: 'middle',
              ml: '-0.5em',
              mr: '0.65em',
              my: '-0.5em',
            }}
          />
        )}
        {children}
      </button>
    );
  }
);

const getSizeStyle = ({ variant, size = 'medium' }: ButtonProps) => {
  if (!variant) {
    return {};
  }
  return {
    small: {
      fontSize: 1,
      paddingX: '1.4em',
      paddingY: '0.6em',
    },
    medium: {
      fontSize: 1,
      paddingX: '1.85em',
      paddingY: '0.85em',
    },
    large: {
      fontSize: 2,
      paddingX: '2em',
      paddingY: '1em',
    },
  }[size];
};

const getVariantStyle = ({ variant, color = 'primary' }: ButtonProps): any => {
  if (!variant) {
    return {
      display: 'flex',
      alignItems: 'center',
    };
  }
  return {
    borderRadius: 3,
    display: 'inline-block',
    textAlign: 'center',
    outlineOffset: '2px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontWeight: 600,
    ...{
      contained: {
        primary: {
          backgroundColor: 'primary',
          color: 'onPrimary',
          '&:not(:disabled):hover': { backgroundColor: 'accentPrimary' },
        },
        secondary: {
          backgroundColor: 'secondary',
          color: 'onSecondary',
          '&:not(:disabled):hover': { backgroundColor: 'accentSecondary' },
        },
        success: {
          backgroundColor: 'success',
          color: 'onSuccess',
          '&:not(:disabled):hover': { backgroundColor: 'accentSuccess' },
        },
        error: {
          backgroundColor: 'error',
          color: 'onError',
          '&:not(:disabled):hover': { backgroundColor: 'accentError' },
        },
      },
      'contained-dimmed': {
        primary: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            //TODO replace filter with backgroundColor
            filter: 'brightness(120%)',
            color: 'onPrimary',
          },
        },
        secondary: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            backgroundColor: 'accentSecondary',
            color: 'onSecondary',
          },
        },
        success: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            backgroundColor: 'accentSuccess',
            color: 'onSuccess',
          },
        },
        error: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            backgroundColor: 'accentError',
            color: 'onError',
          },
        },
      },
      outlined: {
        primary: {
          border: '2px solid',
          borderColor: 'accentContext',
          color: 'primary',
          '&:not(:disabled):hover': {
            borderColor: 'primary',
          },
        },
        secondary: {
          border: '2px solid',
          borderColor: 'accentContext',
          color: 'secondary',
          '&:not(:disabled):hover': {
            borderColor: 'secondary',
          },
        },
        success: {
          border: '2px solid',
          borderColor: 'accentContext',
          color: 'success',
          '&:not(:disabled):hover': {
            borderColor: 'success',
          },
        },
        error: {
          border: '2px solid',
          borderColor: 'accentContext',
          color: 'error',
          '&:not(:disabled):hover': {
            borderColor: 'error',
          },
        },
      },
      text: {
        primary: {
          paddingX: 1,
          borderRadius: 2,
          color: 'primary',
          '&:not(:disabled):hover': { color: 'accentPrimary' },
        },
        secondary: {
          paddingX: 1,
          borderRadius: 2,
          color: 'secondary',
          '&:not(:disabled):hover': { color: 'accentSecondary' },
        },
        success: {
          paddingX: 1,
          borderRadius: 2,
          color: 'success',
          '&:not(:disabled):hover': { color: 'accentSuccess' },
        },
        error: {
          paddingX: 1,
          borderRadius: 2,
          color: 'error',
          '&:not(:disabled):hover': { color: 'accentError' },
        },
      },
    }[variant][color],
  };
};
