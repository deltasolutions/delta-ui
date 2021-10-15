import { BasicTheme } from 'restyler';

const headerHeight = '130px';
const sidebarWidth = '250px';

export const layout: BasicTheme = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  components: {
    container: {
      style: {
        display: 'flex',
        justifyContent: 'center'
      },
      components: {
        content: {
          style: {
            width: '80%',
            maxWidth: '1150px',
            '@media screen and (max-width: 500px)': {
              width: 'calc(100% - 2.5rem)'
            }
          }
        }
      }
    },

    content: {
      style: {
        paddingBottom: 5,
        display: 'flex',
        alignItems: 'flex-start'
      }
    },

    main: {
      style: {
        flex: '1 1 auto',
        minWidth: 0,
        marginLeft: 4,
        marginTop: 4
      }
    },

    sidebar: {
      style: {
        position: 'relative',
        top: `calc(-${headerHeight} + 30px)`,
        left: 0,
        flex: `0 0 ${sidebarWidth}`,
        width: sidebarWidth,
        marginBottom: `calc(-${headerHeight} + 30px)`,
        color: 'onSurface',
        backgroundColor: 'surface',
        boxShadow: 3,
        borderRadius: 2,
        paddingTop: 4,
        paddingBottom: 3
      },
      components: {
        account: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            marginBottom: 3,
            paddingBottom: 3,
            borderBottom: '1px solid',
            borderBottomColor: 'border',
            '& svg': {
              width: '60px',
              height: '60px'
            },
            '& a': {
              fontWeight: 500
            }
          }
        }
      }
    },

    actions: {
      style: {
        display: 'flex',
        gap: 2,
        flex: '0 0 auto',
        '& svg': {
          width: '35px',
          height: '35px',
          verticalAlign: 'middle'
        },
        '& button': {
          cursor: 'pointer',
          '&:hover': { color: 'primary' }
        }
      }
    },

    header: {
      style: {
        margin: 0,
        paddingY: 5,
        color: 'onExterior',
        backgroundColor: 'exterior',
        height: headerHeight
      },
      components: {
        content: {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: sidebarWidth,
            paddingLeft: 4,
            gap: 2
          }
        }
      }
    },

    footer: {
      style: {
        paddingY: 5,
        marginTop: 'auto',
        backgroundColor: 'exterior',
        fontSize: 2,
        letterSpacing: '0.04em',
        // Always on dark.
        fontWeight: 300
      },
      components: {
        anchor: {
          style: {
            color: 'onExterior',
            textDecoration: 'none',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            letterSpacing: 'inherit',
            textTransform: 'uppercase',
            opacity: 0.6,
            transition: 'opacity 0.2s linear',
            '& > img': {
              transition: 'filter 0.2s linear',
              filter: 'grayscale(1) contrast(0) brightness(1.7) opacity(0.8)'
            },
            '&:hover': {
              opacity: 1,
              '& > img': {
                filter: 'grayscale(1) contrast(0) brightness(1.5) opacity(1)'
              }
            }
          }
        }
      }
    }
  }
};
