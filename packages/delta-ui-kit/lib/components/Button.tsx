import { jsx } from '@theme-ui/core';
import {
  ButtonHTMLAttributes,
  ComponentType,
  forwardRef,
  HTMLAttributes,
} from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'contained-dimmed' | 'outlined' | 'text' | 'icon';
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
              zIndex: 1,
              position: 'relative',
              width: '1.65em',
              height: '1.65em',
              verticalAlign: 'middle',
              my: '-0.5em',
              ...(variant === 'icon'
                ? {
                    ...{
                      small: {
                        width: '1.3em',
                        height: '1.3em',
                      },
                      medium: {
                        width: '1.65em',
                        height: '1.65em',
                      },
                    }[size ?? 'medium'],
                  }
                : { ml: '-0.5em', mr: '0.65em' }),
            }}
          />
        )}
        {children}
      </button>
    );
  }
);

const getSizeStyle = ({ variant, size = 'medium' }: ButtonProps) => {
  if (!variant || variant === 'icon') {
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
    return {};
  }
  if (variant === 'icon') {
    return {
      position: 'relative',
      padding: 0,
      display: 'inline-block',
      aspectRatio: '1/1',
      color: 'onContext',
      '&:not(:disabled):hover': {
        color: 'accentOnContext',
        '&::before': {
          content: `""`,
          display: 'block',
          position: 'absolute',
          top: '-25%',
          left: '-25%',
          width: '150%',
          height: '150%',
          borderRadius: 4,
          backgroundColor: 'accentContext',
        },
      },
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
            backgroundColor: 'primary',
            color: 'onPrimary',
          },
        },
        secondary: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            backgroundColor: 'secondary',
            color: 'onSecondary',
          },
        },
        success: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            backgroundColor: 'success',
            color: 'onSuccess',
          },
        },
        error: {
          backgroundColor: 'accentContext',
          color: 'accentOnContext',
          '&:not(:disabled):hover': {
            backgroundColor: 'error',
            color: 'onError',
          },
        },
      },
      outlined: {
        primary: {
          border: '2px solid',
          borderColor: 'primary',
          color: 'primary',
          '&:not(:disabled):hover': {
            borderColor: 'primary',
          },
        },
        secondary: {
          border: '2px solid',
          borderColor: 'secondary',
          color: 'secondary',
          '&:not(:disabled):hover': {
            borderColor: 'secondary',
          },
        },
        success: {
          border: '2px solid',
          borderColor: 'success',
          color: 'success',
          '&:not(:disabled):hover': {
            borderColor: 'success',
          },
        },
        error: {
          border: '2px solid',
          borderColor: 'error',
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
