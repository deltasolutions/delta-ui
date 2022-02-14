import { BasicTheme } from 'restyler';

export const modal: BasicTheme = {
  style: ({ isVisible, isEntering }) => ({
    borderRadius: 3,
    boxShadow: 4,
    color: 'onSurface',
    backgroundColor: 'surface',
    width: '550px',
    maxWidth: 'calc(100% - 2rem)',
    transform: `translateY(${isVisible ? '0' : isEntering ? '1rem' : '-1rem'})`,
    transition: 'transform 0.2s'
  }),
  kinds: {
    small: { style: { width: '450px' } },
    large: { style: { width: '650px' } },
    question: { style: { width: '400px' } },
    sheet: {
      style: ({ isVisible }) => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        paddingY: 4,
        paddingX: 3,
        width: '100vw',
        maxWidth: '100vw',
        transform: `translateY(${isVisible ? 0 : 1}rem)`,
        borderRadius: 0
      })
    }
  },
  components: {
    header: { style: { px: 3, pt: 3, '&:last-of-type': { pb: 3 } } },
    body: { style: { px: 3, pt: 3, '&:last-of-type': { pb: 3 } } },
    footer: {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        px: 3,
        pt: 3,
        '&:last-of-type': { pb: 3 }
      }
    }
  }
};
