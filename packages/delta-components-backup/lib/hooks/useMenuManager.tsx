import {
  useFloating,
  offset,
  autoPlacement,
  arrow,
  shift
} from '@floating-ui/react-dom';
import { RefObject, useRef, useState } from 'react';
export interface MenuManagerOptions {}
export const useMenuManager = () => {
  const [display, setDisplay] = useState<'visible' | 'hidden'>('hidden');
  const show = () => {
    setDisplay('visible');
  };
  const hide = () => {
    setDisplay('hidden');
  };
  return {
    hide,
    show,
    display,
    ...useFloating({
      middleware: [
        offset(6),
        autoPlacement({
          alignment: 'end',
          autoAlignment: true,
          allowedPlacements: ['bottom']
        }),
        shift()
      ],
      placement: 'bottom-end'
    })
  };
};
