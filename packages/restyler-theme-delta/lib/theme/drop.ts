import { BasicTheme } from 'restyler';

export const drop: BasicTheme = {
  style: ({ isVisible, isEntering }) => ({
    zIndex: 9000,
    borderRadius: 2,
    boxShadow: 2,
    backgroundColor: 'white',
    transform: `translateY(${
      isVisible ? '0' : isEntering ? '-0.5rem' : '0.5rem'
    })`,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.2s, transform 0.2s'
  })
};
