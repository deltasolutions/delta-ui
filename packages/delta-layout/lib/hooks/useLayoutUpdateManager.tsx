import { useCallback, useMemo, useState } from 'react';
import { LayoutUpdateManager } from '../models';

export interface LayoutUpdateManagerOptions {
  onSave?: (updates: LayoutUpdateManager['updates']) => void | Promise<void>;
}

export const useLayoutUpdateManager = ({
  onSave
}: LayoutUpdateManagerOptions): LayoutUpdateManager => {
  const [targets, setTargets] = useState<string[]>([]);
  const [updates, setUpdates] = useState<LayoutUpdateManager['updates']>({});
  const allow = useCallback<LayoutUpdateManager['allow']>(toBeAllowed => {
    setTargets(targets => {
      const targetSet = new Set(targets);
      const rest = toBeAllowed.filter(v => !targetSet.has(v));
      return targets.concat(rest);
    });
  }, []);
  const update = useCallback<LayoutUpdateManager['update']>((target, data) => {
    setUpdates(prior => ({ ...prior, [target]: data }));
  }, []);
  const save = useCallback<LayoutUpdateManager['save']>(
    async (toBeSaved = targets) => {
      const toBeSavedSet = new Set(toBeSaved);
      const data = toBeSaved.reduce((p, v) => ({ ...p, [v]: updates[v] }), {});
      await onSave?.(data);
      setUpdates(
        Object.keys(updates).reduce(
          (p, v) => (toBeSavedSet.has(v) ? p : { ...p, [v]: updates[v] }),
          {}
        )
      );
      setTargets(targets.filter(v => !toBeSavedSet.has(v)));
    },
    [updates, targets, onSave]
  );
  const cancel = useCallback<LayoutUpdateManager['cancel']>(
    (toBeCancelled = targets) => {
      const toBeCancelledSet = new Set(toBeCancelled);
      setTargets(targets.filter(v => !toBeCancelledSet.has(v)));
      setUpdates(
        Object.keys(updates).reduce(
          (p, v) => (toBeCancelledSet.has(v) ? p : { ...p, [v]: updates[v] }),
          {}
        )
      );
    },
    [targets, updates]
  );
  const checkIfUpdating = useCallback<LayoutUpdateManager['checkIfUpdating']>(
    (v: string) => targets.includes(v),
    [targets]
  );
  const manager = {
    updates,
    update,
    allow,
    save,
    cancel,
    checkIfUpdating
  };
  return useMemo(() => manager, Object.values(manager));
};
