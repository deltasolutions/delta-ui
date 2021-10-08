import { BasicTheme, mergeBasicThemes } from 'restyler';

const actionButtonTheme = {
  style: {
    cursor: 'pointer',
    backgroundColor: 'surface',
    border: 'none',
    svg: {
      width: '26px',
      height: '26px',
      verticalAlign: 'middle',
      color: 'inherit',
      transition: 'color 0.2s linear'
    },
    '&:hover': {
      svg: { color: 'primary' }
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5
    }
  }
};

export const form: BasicTheme = {
  components: {
    field: {
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      components: {
        label: {
          style: ({ required }) => ({
            '&:last-child': { mb: 0 },
            ...(required
              ? {
                  '&:after': {
                    content: '" *"',
                    color: 'danger'
                  }
                }
              : {})
          })
        },
        control: {
          style: { marginTop: 2 }
        },
        help: {
          style: { marginTop: 1, opacity: 0.7 }
        },
        errors: {
          components: {
            item: {
              style: { marginTop: 1, color: 'danger' }
            }
          }
        },
        object: {
          style: { display: 'flex', flexDirection: 'column' },
          components: {
            header: {
              style: { weight: 500 }
            },
            body: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }
            }
          }
        },
        array: {
          style: {
            display: 'flex',
            flexDirection: 'column'
          },
          components: {
            header: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                weight: 500
              },
              components: {
                actions: { style: { mr: 3 } }
              }
            },
            body: {
              style: {
                display: 'flex',
                flexDirection: 'column'
              }
            },
            item: {
              style: ({ hasPadding }) => ({
                position: 'relative',
                '& + &, &:first-of-type': {
                  marginTop: 3,
                  paddingTop: 3,
                  borderTop: '1px solid',
                  borderTopColor: 'border'
                },
                ...(hasPadding ? { pl: 3 } : {})
              })
            },
            addButton: mergeBasicThemes({}, actionButtonTheme),
            removeButton: mergeBasicThemes({}, actionButtonTheme, {
              style: ({ theme: { space = [] } = {} }) => ({
                position: 'absolute',
                backdropFilter: 'blur(100px)',
                top: '0',
                right: space[3],
                transform: 'translateY(-50%)'
              })
            }),
            pagerButton: mergeBasicThemes({}, actionButtonTheme, {
              marginRight: 2
            })
          }
        }
      }
    },
    grid: {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 3
      }
    }
  }
};
