import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  FloatingTree
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  FC,
  forwardRef,
  isValidElement,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { RiArrowRightSFill } from 'react-icons/ri';
import { mergeRefs } from '../../utils';
import { AsButton } from '../AsButton';
import { Box, BoxProps } from '../Box';
import { DropdownItem } from './DropdownItem';

export interface DropdownProps extends BoxProps {
  component?: ReactElement<any>;
  label?:
    | ((boolean | ReactChild | ReactFragment | ReactPortal | null) & string)
    | undefined;
  nested?: boolean;
}
const MenuComponent = forwardRef<any, DropdownProps>(
  ({ children, component, label, ...rest }: DropdownProps, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const listItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const listContentRef = useRef(
      Children.map(children, child =>
        isValidElement(child) ? child.props.label : null
      ) as (string | null)[]
    );
    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = parentId != null;
    const { x, y, reference, floating, strategy, refs, update, context } =
      useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [
          offset({ mainAxis: 8, alignmentAxis: nested ? -5 : 0 }),
          flip(),
          shift()
        ],
        placement: nested ? 'right-start' : 'bottom-start',
        nodeId
      });
    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useHover(context, {
          handleClose: safePolygon(),
          enabled: nested,
          restMs: 1
        }),
        useClick(context, { toggle: !nested }),
        useRole(context, { role: 'menu' }),
        useDismiss(context),
        useListNavigation(context, {
          listRef: listItemsRef,
          activeIndex,
          nested,
          onNavigate: setActiveIndex
        }),
        useTypeahead(context, {
          enabled: open,
          listRef: listContentRef,
          onMatch: setActiveIndex,
          activeIndex
        })
      ]);
    useEffect(() => {
      if (open && refs.reference.current && refs.floating.current) {
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update
        );
      }
      return () => {};
    }, [open, nested, update, refs.reference, refs.floating]);
    useEffect(() => {
      function onTreeOpenChange({
        open,
        reference,
        parentId
      }: {
        open: boolean;
        reference: Element;
        parentId: string;
      }) {
        if (parentId !== nodeId) {
          return;
        }
        listItemsRef.current.forEach(item => {
          if (item && item !== reference) {
            item.style.pointerEvents = open ? 'none' : '';
          }
        });
      }
      tree.events.on('openChange', onTreeOpenChange);
      return () => {
        tree.events.off('openChange', onTreeOpenChange);
      };
    }, [nodeId, tree.events, refs.reference, refs.floating]);
    useEffect(() => {
      tree?.events.emit('openChange', {
        open,
        parentId,
        reference: refs.reference.current
      });
    }, [tree, open, parentId, refs.reference]);
    const mergedReferenceRef = useMemo(
      () => mergeRefs([ref, reference]),
      [reference, ref]
    );
    return (
      <FloatingNode id={nodeId}>
        {parentId === null && component ? (
          <Box ref={mergedReferenceRef} role="menu-item">
            {cloneElement(component, {
              ...getReferenceProps({
                ...rest,
                onClick: ({ currentTarget }) =>
                  (currentTarget as HTMLButtonElement).focus()
              })
            })}
          </Box>
        ) : (
          <DropdownItem open={open}>
            <AsButton
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              {...getReferenceProps({
                ...rest,
                ref: mergedReferenceRef,
                onClick: ({ currentTarget }) =>
                  (currentTarget as HTMLButtonElement).focus()
              })}
            >
              {label}
              {nested && (
                <RiArrowRightSFill sx={{ fill: 'text_base' }} size={22} />
              )}
            </AsButton>
          </DropdownItem>
        )}
        <FloatingPortal>
          {open && (
            <Box
              sx={{
                backgroundColor: 'decorative_subdued',
                width: '185px',
                borderWidth: '0.1px',
                borderStyle: 'solid',
                borderColor: 'border_base',
                boxShadow:
                  '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
                padding: '4px',

                fontWeight: 'bold',
                fontSize: '14px',
                borderRadius: '4px'
              }}
              {...getFloatingProps({
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? '',
                  left: x ?? ''
                }
              })}
            >
              {Children.map(
                children,
                (child, index) =>
                  isValidElement(child) &&
                  cloneElement(
                    child,
                    getItemProps({
                      role: 'menuItem',
                      ref(node: HTMLButtonElement) {
                        listItemsRef.current[index] = node;
                      }
                    })
                  )
              )}
            </Box>
          )}
        </FloatingPortal>
      </FloatingNode>
    );
  }
);

export const Dropdown: FC<DropdownProps> = forwardRef(
  ({ ...rest }: DropdownProps, ref) => {
    const parentId = useFloatingParentNodeId();
    if (parentId == null) {
      return (
        <FloatingTree>
          <MenuComponent {...rest} ref={ref} />
        </FloatingTree>
      );
    }
    return <MenuComponent {...rest} ref={ref} />;
  }
);
