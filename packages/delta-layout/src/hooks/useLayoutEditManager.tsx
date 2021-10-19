import { useCallback, useState } from 'react';
import { LayoutEditManager } from '../models';

export interface LayoutEditManagerOptions {
  onSave: (target: string, updates: any) => void;
}

export const useLayoutEditManager = ({ onSave }: LayoutEditManagerOptions) => {
  const [updates, setUpdates] = useState<LayoutEditManager['updates']>({});
  const edit = useCallback<LayoutEditManager['edit']>(targets => {
    setUpdates(prior => ({
      ...prior,
      ...targets.reduce((p, v) => ({ ...p, [v]: {} }), {})
    }));
  }, []);
  const save = useCallback<LayoutEditManager['save']>(
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
  const cancel = useCallback<LayoutEditManager['cancel']>(
    () => setUpdates({}),
    []
  );
  return {
    updates,
    edit,
    save,
    cancel
  };
};
