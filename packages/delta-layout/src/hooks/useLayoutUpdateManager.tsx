import { useCallback, useState } from 'react';
import { LayoutUpdateManager } from '../models';

export interface LayoutUpdateManagerOptions {
  onSave: (target: string, updates: any) => void;
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
    targets => {
      const targetSet = new Set(targets);
      setUpdates(prior =>
        Object.keys(prior).reduce((p, v) => {
          if (targetSet.has(v)) {
            onSave(v, prior[v]);
            return p;
          } else {
            return { ...p, [v]: prior[v] };
          }
        }, {})
      );
    },
    [onSave]
  );
  const cancel = useCallback<LayoutUpdateManager['cancel']>(() => {
    setTargets(() => []);
    setUpdates(() => ({}));
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
