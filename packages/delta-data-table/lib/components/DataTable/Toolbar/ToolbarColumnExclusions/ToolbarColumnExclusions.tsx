import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDragLayer } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import {
  disableScroll,
  interactiveStackId,
  StandaloneTransitionerProps,
  useClickOutside,
  useSharedRef,
  useStack,
  useThemedFactory
} from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { ColumnExclusionItem } from './ColumnExclusionItem';

export interface ToolbarColumnExclusionsContext {
  anchorRef: RefObject<HTMLSpanElement>;
}

export type ToolbarColumnExclusionsThemedPartProps =
  StandaloneTransitionerProps<ToolbarColumnExclusionsContext> & {
    isDragging: boolean;
  };

export const ToolbarColumnExclusions = forwardRef<
  HTMLDivElement,
  StandaloneTransitionerProps<ToolbarColumnExclusionsContext>
>((props, ref) => {
  const [t] = useTranslation('common');
  const useThemed = useThemedFactory<ToolbarColumnExclusionsThemedPartProps>();
  const ThemedExclusions = useThemed(
    'div',
    'dataTable.configurer.columnExclusions'
  );
  const ThemedExclusionsQuery = useThemed(
    'input',
    'dataTable.configurer.columnExclusions.query'
  );
  const ThemedExclusionsContent = useThemed(
    'div',
    'dataTable.configurer.columnExclusions.content'
  );
  const { handleClose, context: { anchorRef } = {} } = props;
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  const [query, setQuery] = useState('');
  const {
    manager: {
      columns,
      activeTab: { columnExclusions = [] }
    }
  } = useContext(DataTableContext);
  useClickOutside(sharedRef, handleClose);
  useStack(interactiveStackId);
  useEffect(() => {
    return disableScroll();
  }, []);
  const columnMap = useMemo(
    () => Object.fromEntries(columns.map(v => [v.key, v])),
    [columns]
  );
  const getColumnHeader = useCallback(
    (key: string) => columnMap[key]?.header ?? key,
    [columnMap]
  );
  const anchorRect = useMemo(
    () => anchorRef?.current?.getBoundingClientRect() ?? ({} as DOMRect),
    []
  );
  const { isDragging } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging() && monitor.getItemType() === 'column'
  }));
  const filteredExclusions = useMemo(
    () =>
      query
        ? columnExclusions.filter(
            v =>
              v.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
              getColumnHeader(v)
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase())
          )
        : columnExclusions,
    [columnExclusions, getColumnHeader, query]
  );
  return (
    <ThemedExclusions
      ref={sharedRef}
      style={{
        position: 'fixed',
        zIndex: 1000,
        top: anchorRect.top + anchorRect.height + 10,
        left: anchorRect.left + anchorRect.width / 2 - 100
      }}
      isDragging={isDragging}
      {...props}
    >
      <ThemedExclusionsQuery
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t('labels.search')}
        isDragging={isDragging}
        {...props}
      />
      {filteredExclusions.length > 0 ? (
        <ThemedExclusionsContent isDragging={isDragging} {...props}>
          {filteredExclusions.map(exclusion => (
            <ColumnExclusionItem key={exclusion} exclusion={exclusion}>
              {getColumnHeader(exclusion)}
            </ColumnExclusionItem>
          ))}
        </ThemedExclusionsContent>
      ) : (
        <ThemedExclusionsContent
          kind="empty"
          isDragging={isDragging}
          {...props}
        >
          {t('labels.empty')}
        </ThemedExclusionsContent>
      )}
    </ThemedExclusions>
  );
});
