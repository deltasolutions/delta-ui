import { BasicTheme } from 'restyler';

const createKind = (
  backgroundColor: string,
  accentBackgroundColor: string,
  color: string,
  extras?: any
): BasicTheme => ({
  style: props => ({
    paddingX: 3,
    paddingY: 2,
    borderRadius: 2,
    backgroundColor,
    color,
    fontSize: 2,
    fontFamily: 'body',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    outline: 'none',
    ...(props.disabled
      ? {
          filter: 'saturate(0.65)',
          pointerEvents: 'none'
        }
      : {
          '&:hover, &:focus': {
            backgroundColor: accentBackgroundColor
          }
        }),
    ...extras
  })
});

export const button: BasicTheme = {
  kinds: {
    primary: createKind('primary', 'accentPrimary', 'onPrimary'),
    secondary: createKind('secondary', 'accentSecondary', 'onSecondary'),
    success: createKind('success', 'accentSuccess', 'onSuccess'),
    warning: createKind('warning', 'accentWarning', 'onWarning'),
    danger: createKind('danger', 'accentDanger', 'onDanger'),
    icon: {
      style: {
        cursor: 'pointer',
        marginY: '-0.25em',
        '&:hover': { color: 'primary' },
        '& svg': {
          width: '1.5em',
          height: '1.5em',
          verticalAlign: 'middle'
        }
      }
    }
  }
};
