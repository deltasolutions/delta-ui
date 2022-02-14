import { useCallback, useState } from 'react';

export const useLocalLayoutMenu = (initialActiveIds: string[] = []) => {
  const [activeIds, setActiveIds] = useState<string[]>(initialActiveIds);
  const onItemClick = useCallback((id: string) => {
    setActiveIds(priorIds =>
      priorIds.includes(id)
        ? priorIds.filter(v => v !== id)
        : priorIds.concat([id])
    );
  }, []);
  return {
    activeIds,
    setActiveIds,
    onItemClick,
    onGroupClick: onItemClick
  };
};
