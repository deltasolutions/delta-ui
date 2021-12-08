import { BasicTheme } from 'restyler';
import { card } from '../card';

export const configurer: BasicTheme = {
  style: { display: 'flex', gap: 2 },
  components: {
    columnExclusions: {
      style: ({ isVisible, isDragging }) => ({
        ...card.style,
        width: '200px',
        overflow: 'hidden',
        opacity: isVisible ? (isDragging ? 0.8 : 1) : 0,
        transform: isVisible
          ? isDragging
            ? 'translateY(-100%)'
            : ''
          : 'translateY(10px)',
        transition: 'transform 0.2s, opacity 0.2s'
      }),
      components: {
        query: {
          style: {
            paddingX: 3,
            paddingTop: 3,
            paddingBottom: 2,
            borderBottom: '1px solid',
            borderBottomColor: 'border',
            width: '100%',
            outline: 'none',
            '&:focus, &:active': {
              borderBottomColor: 'primary'
            }
          }
        },
        content: {
          style: {
            paddingX: 3,
            paddingTop: 2,
            paddingBottom: 3,
            maxHeight: '250px',
            overflowY: 'auto',
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          },
          kinds: {
            empty: {
              style: {
                opacity: 0.6,
                textAlign: 'center'
              }
            }
          }
        },
        item: {
          style: ({ isDragging }) => ({
            paddingY: 1,
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            cursor: 'move',
            opacity: isDragging ? 0.5 : 1,
            '&:hover': {
              color: 'primary'
            }
          })
        }
      }
    }
  }
};
