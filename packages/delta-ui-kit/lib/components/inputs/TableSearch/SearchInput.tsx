import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDrop, useImperativePortal } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { SystemContext, Box } from '../../containers';
import { TextInput, TextInputProps } from '../TextInput';
import { DropContext, TableSearchContext } from './contexts';
import { DropContainer } from './DropContainer';
import { TableSearchDropMenu } from './TableSearchDropMenu';
import { TableSearchDropMenuItem } from './TableSearchDropMenuItem';
import { BunchData } from './types';

export interface SearchInput extends Omit<TextInputProps, 'onBlur'> {
  onBlur?: (ev) => void;
  bunch?: BunchData;
  autoFocus: boolean;
  onItemClick: (value: string) => void;
  editingItem?: 'value' | 'operator' | 'id';
}

export const SearchInput = forwardRef(
  (
    {
      onBlur,
      onFocus,
      value,
      autoFocus,
      editingItem,
      onItemClick,
      bunch,
      ...rest
    }: SearchInput,
    ref
  ) => {
    const { floatingPortal } = useContext(SystemContext);
    const portal = useImperativePortal(floatingPortal);
    const { disabled, proposes, operators } = useContext(TableSearchContext);
    const closeDropRef = useRef<undefined | (() => void)>();
    const inputRef = useRef<HTMLInputElement>(null);
    const requestRef = useRef<any>();
    const dropRef = useRef<HTMLDivElement>(null);
    const [openDrop, anchorRef] = useDrop(
      props => <DropContainer ref={dropRef} {...props} />,
      {
        deps: [],
        portal,
        blurResistant: true,
        placement: 'bottom-start',
        tailored: false,
        style: {
          marginTop: '12px',
        },
      }
    );
    const handleOpen = useCallback(() => {
      closeDropRef.current = openDrop();
    }, [openDrop]);
    const stableRef = useMemo(
      () => mergeRefs([anchorRef, inputRef, ref]),
      [anchorRef, inputRef, ref]
    );
    const handleClose = useCallback(() => {
      closeDropRef.current?.();
    }, []);
    const renderDrop = useCallback(
      handleClose => {
        if (editingItem === 'id') {
          const filteredProposes = proposes.filter(propose =>
            propose.label
              .toLocaleLowerCase()
              .includes(value?.toLocaleLowerCase() ?? '')
          );
          return (
            <TableSearchDropMenu
              ref={dropRef}
              handleClose={handleClose}
              onItemClick={(v: string) => {
                handleClose();
                onItemClick(v);
              }}
            >
              {filteredProposes.map(propose => (
                <TableSearchDropMenuItem key={propose.id} value={propose.id}>
                  {propose.label}
                </TableSearchDropMenuItem>
              ))}
            </TableSearchDropMenu>
          );
        }
        const propose = proposes.find(p => p.id === bunch?.id);
        if (!propose) {
          return null;
        }
        if (editingItem === 'operator') {
          const filteredOperators = Object.entries(operators).filter(
            ([_, shownValue]) =>
              shownValue
                .toLocaleLowerCase()
                .includes(value?.toLocaleLowerCase() ?? '')
          );

          return (
            <TableSearchDropMenu
              ref={dropRef}
              handleClose={handleClose}
              onItemClick={(v: string) => {
                handleClose();
                onItemClick(v);
              }}
            >
              {filteredOperators.map(([value, shownValue]) => (
                <TableSearchDropMenuItem key={value} value={value}>
                  {shownValue}
                </TableSearchDropMenuItem>
              ))}
            </TableSearchDropMenu>
          );
        }
        if (editingItem === 'value') {
          return propose.renderDrop({
            query: value,
            onItemClick: v => {
              handleClose();
              onItemClick(v);
            },
            ref: dropRef,
            handleClose,
          });
        }
        return null;
      },
      [proposes, bunch, value, editingItem, dropRef, operators]
    );

    //TODO remove raf
    useEffect(() => {
      if (autoFocus) {
        requestRef.current = requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
      const handleNativeBlur = ev => {
        if (
          !ev.relatedTarget ||
          !dropRef.current ||
          !dropRef.current.contains(ev.relatedTarget)
        ) {
          handleClose();
          onBlur?.(ev);
        }
      };
      const handleNativeFocus = ev => {
        handleOpen();
        onFocus?.();
      };
      inputRef.current?.addEventListener('blur', handleNativeBlur);
      inputRef.current?.addEventListener('focus', handleNativeFocus);
      return () => {
        inputRef.current?.removeEventListener('blur', handleNativeBlur);
        inputRef.current?.removeEventListener('focus', handleNativeFocus);
        cancelAnimationFrame(requestRef.current);
      };
    }, [handleOpen]);
    return (
      <DropContext.Provider value={{ renderDrop }}>
        <Box>
          {portal}
          <TextInput
            ref={stableRef}
            autoComplete="off"
            disabled={disabled}
            sx={{
              ...(disabled && { display: 'none' }),
            }}
            value={value}
            variant="pure"
            {...rest}
          />
        </Box>
      </DropContext.Provider>
    );
  }
);
