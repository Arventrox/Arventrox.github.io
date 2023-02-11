import React, { useEffect, useContext } from 'react';
import { BtnContext } from '../store/context';

const useOutsideAlerter = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const { setIsInputFocused } = useContext(BtnContext);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideAlerter;
