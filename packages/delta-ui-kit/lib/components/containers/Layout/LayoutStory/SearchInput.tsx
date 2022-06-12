import { jsx } from '@theme-ui/core';
import { useCallback, useRef, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { Transition } from 'react-transition-group';
import { Button } from '../../../Button';
import { TextInput } from '../../../inputs';
import { Box } from '../../Box';

export const SearchInput = ({ value, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);
  const [showButton, setShowButton] = useState(!active);
  const onInputBlur = useCallback(() => {
    if (!value) {
      setActive(false);
    }
  }, [value]);
  return (
    <Box
      role="dd"
      sx={{
        height: '40px',
        position: 'relative',
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Transition
        in={active}
        sx={{ marginLeft: 'auto' }}
        timeout={inputDuration}
        onEntering={() => ref.current?.focus()}
        onExited={() => {
          ref.current?.blur();
          setShowButton(true);
        }}
      >
        {state => (
          <TextInput
            ref={ref}
            placeholder="Search something"
            style={{
              transition: `width ${inputDuration}ms ease-in-out, opacity ${inputDuration}ms ease-in-out`,
              ...inputStyles[state],
            }}
            value={value}
            onBlur={onInputBlur}
            onChange={onChange}
          />
        )}
      </Transition>
      {showButton && (
        <Button
          sx={{ '&:focus-visible, &:hover': { outline: 'none' } }}
          onClick={() => {
            setShowButton(false);
            setActive(true);
          }}
          onFocus={e => {
            setShowButton(false);
            setActive(true);
          }}
        >
          <CgSearch size={18} />
        </Button>
      )}
    </Box>
  );
};
const inputDuration = 300;
const inputStyles = {
  entering: { visibility: 'visible', opacity: 1, width: '100%' },
  entered: { visibility: 'visible', opacity: 1, width: '100%' },
  exiting: { opacity: 0, width: '0px' },
  exited: { opacity: 0, visibility: 'hidden', width: '0px' },
};
