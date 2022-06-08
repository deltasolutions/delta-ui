import { jsx } from '@theme-ui/core';
import {
  useEffect,
  useReducer,
  RefObject,
  ReactNode,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import { Notification, NotificationProps, SystemContext } from '../components';
import { hash, mergeRefs } from '../utils';
import {
  PortalledTransitionProps,
  usePortalledTransition,
} from './usePortalledTransition';

export enum NotificationPlacement {
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
}

export interface NotificationOptions
  extends Omit<NotificationProps, 'children'> {
  duration?: number;
  placement?: NotificationPlacement;
  onClose?: () => void;
  render: (props: PortalledTransitionProps) => ReactNode;
}

const notifications = [] as {
  id: any;
  ref: RefObject<HTMLDivElement>;
  props: PortalledTransitionProps;
  update: () => void;
}[];

export const useNotification = () => {
  const { floatingPortal } = useContext(SystemContext);
  const openNotification = usePortalledTransition<
    HTMLDivElement,
    NotificationOptions
  >(
    (
      {
        context: {
          placement,
          duration,
          render,
          onClose,
          ...notificationProps
        } = {},
        handleClose: handleCurrentClose,
        ...transitionProps
      },
      ref
    ) => {
      const props = useMemo(
        () => ({
          handleClose: () => {
            handleCurrentClose();
            onClose?.();
          },
          ...transitionProps,
          ...notificationProps,
        }),
        [
          handleCurrentClose,
          onClose,
          hash(transitionProps),
          hash(notificationProps),
        ]
      );
      const { handleClose } = props;
      const id = useMemo(() => Symbol(), []);
      const [_, update] = useReducer(v => v + 1, 0);
      const notificationRef = useRef<HTMLDivElement>(null);
      const mergedRef = useMemo(
        () => mergeRefs([ref, notificationRef]),
        [ref, notificationRef]
      );
      const getNotificationIndex = useCallback(() => {
        const i = notifications.findIndex(v => v.id === id);
        // If current notification wasn't found, then it's going
        // to be added to the registry during the actual render,
        // thus we can predict its index as the length of array.
        return i === -1 ? notifications.length : i;
      }, []);
      useEffect(() => {
        const notification = {
          id,
          ref: notificationRef,
          props,
          update,
        };
        notifications[getNotificationIndex()] = notification;
        return () => {
          const index = getNotificationIndex();
          index >= 0 && notifications.splice(index, 1);
          // One needs to update other notifications on unmount
          // for them to keep the order without gaps.
          notifications.forEach(v => v.update());
        };
      }, []);
      useEffect(() => {
        if (duration) {
          const timeoutId = setTimeout(handleClose, duration);
          return () => clearTimeout(timeoutId);
        }
        return undefined;
      }, []);
      const index = getNotificationIndex();
      // TODO: One has to filter notifications by the placement.
      const offset = notifications.slice(0, index).reduce((prev, curr) => {
        const element = curr.ref.current;
        if (!element) {
          return prev;
        }
        const computedStyle = getComputedStyle(element);
        const height =
          element.offsetHeight +
          Math.max(
            parseInt(computedStyle.getPropertyValue('margin-top')),
            parseInt(computedStyle.getPropertyValue('margin-bottom'))
          );
        return prev + height;
      }, 0);
      const offsetProperty =
        placement === NotificationPlacement.TopLeft ||
        placement === NotificationPlacement.TopRight
          ? 'top'
          : 'bottom';
      const stickProperty =
        placement === NotificationPlacement.TopLeft ||
        placement === NotificationPlacement.BottomLeft
          ? 'left'
          : 'right';
      return (
        <Notification
          ref={mergedRef}
          style={{
            position: 'fixed',
            zIndex: 1100,
            [offsetProperty]: offset,
            [stickProperty]: 0,
          }}
          {...props}
        >
          {render?.(props)}
        </Notification>
      );
    },
    {
      deps: [],
      portal: floatingPortal,
    }
  );
  return openNotification;
};
