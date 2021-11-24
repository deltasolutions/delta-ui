import { useCallback, useMemo, useState } from 'react';
import { LayoutMenuEntryDef, LayoutMenuOptions } from '../models';

export interface LocalLayoutMenuOptions extends Partial<LayoutMenuOptions> {
  // Making entries required.
  entries: LayoutMenuOptions['entries'];
}

export const useLocalLayoutMenu = (
  options: LocalLayoutMenuOptions
): LayoutMenuOptions => {
  const entryIdSet = useMemo(() => {
    const ids = new Set<string>();
    const walk = (toBeWalked: LayoutMenuEntryDef[]) =>
      toBeWalked.forEach(v => (v.subs ? walk(v.subs) : ids.add(v.id)));
    walk(options.entries);
    return ids;
  }, [options.entries]);
  const [activeIds, setActiveIds] = useState<string[]>(options.activeIds ?? []);
  const onGroupClick = useCallback((id: string) => {
    setActiveIds(priorIds =>
      priorIds.includes(id)
        ? priorIds.filter(v => v !== id)
        : priorIds.concat([id])
    );
  }, []);
  const onItemClick = useCallback(
    (id: string) => {
      setActiveIds(priorIds =>
        priorIds.filter(v => !entryIdSet.has(v)).concat([id])
      );
    },
    [entryIdSet]
  );
  return {
    ...options,
    activeIds,
    onGroupClick,
    onItemClick
  };
};
