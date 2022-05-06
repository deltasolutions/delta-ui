import { useEffect } from 'react';

export const useClickAwayListener = (ref, callback, exceptions: any = []) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref &&
        !exceptions.some(e => e?.contains(event.target)) &&
        !ref.contains(event.target)
      ) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, exceptions]);
};
