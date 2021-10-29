import { useCallback, useMemo, useState } from 'react';
import { LayoutMenuOptions, PageDef } from '../models';

export interface LocalLayoutMenuOptions extends Partial<LayoutMenuOptions> {
  pages: PageDef[];
}

export const useLocalLayoutMenu = ({
  pages,
  ...rest
}: LocalLayoutMenuOptions): LayoutMenuOptions => {
  const itemIds = useMemo(() => {
    const ids = new Set<string>();
    const walk = (currentPages: PageDef[]) =>
      currentPages.forEach(v => (v.subs ? walk(v.subs) : ids.add(v.id)));
    walk(pages);
    return ids;
  }, [pages]);
  const [activeIds, setActiveIds] = useState<string[]>(rest.getActiveIds ?? []);
  const getActiveIds = useCallback(() => activeIds, [activeIds]);
  const onGroupClick = useCallback(
    (id: string) => {
      rest.onGroupClick?.(id);
      setActiveIds(priorIds =>
        priorIds.includes(id)
          ? priorIds.filter(v => v !== id)
          : priorIds.concat([id])
      );
    },
    [rest.onGroupClick]
  );
  const onItemClick = useCallback(
    (id: string) => {
      rest.onItemClick?.(id);
      setActiveIds(priorIds =>
        priorIds.filter(v => !itemIds.has(v)).concat([id])
      );
    },
    [rest.onGroupClick, itemIds]
  );
  return {
    getActiveIds,
    onGroupClick,
    onItemClick
  };
};
