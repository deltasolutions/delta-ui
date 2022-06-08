import { ReactElement } from 'react';
import { AutocompleteOptionProps } from './AutocompleteOption';

export const getTitleByChild = (
  child: ReactElement<AutocompleteOptionProps>
) => {
  return (
    child?.props.title ??
    (typeof child.props.children === 'string'
      ? child.props.children
      : String(child?.props.value))
  );
};

export const getTitleByValue = (
  childrenArray: ReactElement<AutocompleteOptionProps>[],
  value: unknown
) => {
  const child = childrenArray.find(v => v.props.value === value);
  return child ? getTitleByChild(child) : 'Unknown';
};

export const getInitialInnerValue = (
  childrenArray: ReactElement<AutocompleteOptionProps>[],
  value: unknown[] | undefined
) => {
  return (
    value?.map(v => ({ value: v, title: getTitleByValue(childrenArray, v) })) ??
    []
  );
};
