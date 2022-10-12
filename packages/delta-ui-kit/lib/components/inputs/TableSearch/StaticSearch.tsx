import { jsx } from '@theme-ui/core';
import { useContext, useState } from 'react';
import { TableSearchContext } from './contexts';
import { SearchInput } from './SearchInput';

export const StaticSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const { setCurrentEditingIndex, currentEditingIndex, setValue, value } =
    useContext(TableSearchContext);
  return (
    <li sx={{ flex: 1, maxWidth: 'inherit', minWidth: '200px' }}>
      <SearchInput
        autoFocus={currentEditingIndex === undefined}
        editingItem="id"
        value={inputValue}
        onChange={setInputValue}
        onItemClick={v => {
          setValue(prev => {
            setCurrentEditingIndex(prev.length);
            return [...prev, { id: v, operator: '' }];
          });
        }}
        onKeyDown={ev => {
          if (ev.key === 'Backspace') {
            if ((ev.target as any).selectionStart === 0) {
              ev.preventDefault();
              if (value.length) {
                setCurrentEditingIndex(value.length - 1);
              }
            }
            return;
          }
        }}
      />
    </li>
  );
};
