import { useCallback, useState } from 'react';
import { LayoutUpdateManager } from '../models';

export interface LayoutUpdateManagerOptions {
  onSave?: (updates: LayoutUpdateManager['updates']) => void | Promise<void>;
}

export const useLayoutUpdateManager = ({
  onSave
}: LayoutUpdateManagerOptions): LayoutUpdateManager => {
  const [targets, setTargets] = useState<string[]>([]);
  const [updates, setUpdates] = useState<LayoutUpdateManager['updates']>({});
  const update = useCallback<LayoutUpdateManager['update']>((target, data) => {
    setUpdates(prior => ({ ...prior, [target]: data }));
  }, []);
  const allow = useCallback<LayoutUpdateManager['allow']>(
    v => setTargets(v),
    []
  );
  const save = useCallback<LayoutUpdateManager['save']>(
    async (targetsToSave = targets) => {
      const set = new Set(targetsToSave);
      const data = targetsToSave.reduce(
        (p, v) => ({ ...p, [v]: updates[v] }),
        {}
      );
      await onSave?.(data);
      setUpdates(
        Object.keys(updates).reduce(
          (p, v) => (set.has(v) ? p : { ...p, [v]: updates[v] }),
          {}
        )
      );
      setTargets(targets.filter(v => !set.has(v)));
    },
    [updates, targets, onSave]
  );
  const cancel = useCallback<LayoutUpdateManager['cancel']>(() => {
    // FIXME: it should cancel only given targets
    setTargets([]);
    setUpdates({});
  }, []);
  const checkIfUpdating = useCallback<LayoutUpdateManager['checkIfUpdating']>(
    (v: string) => targets.includes(v),
    [targets]
  );
  return {
    updates,
    update,
    allow,
    save,
    cancel,
    checkIfUpdating
  };
};
