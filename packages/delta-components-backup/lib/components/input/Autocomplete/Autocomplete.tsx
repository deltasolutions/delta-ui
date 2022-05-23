import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  Ref,
  ReactElement,
  ReactNode
} from 'react';
import { Basic } from './Basic';
import { Multiple } from './Multiple';

export type Suggestion = string;
export type Query = string;
export type Value = string;

export interface AutocompleteProps<TMultiple>
  extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  suggestions: Suggestion[];
  isMultiple?: TMultiple;
  value?: TMultiple extends true ? Value[] : Value;
  size?: 'medium';
  variant?: 'contained';
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: TMultiple extends true ? Value[] : Value) => void;
  onSearch?: (query: Query) => void;
  onOpen?: (query: Query) => void;
}

export interface AutocompleteProps2
  extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  suggestions: {
    value: unknown;
    render: () => ReactNode;
  }[];
  value?: unknown[];
  size?: 'medium';
  variant?: 'contained';
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: unknown) => void;
  onSearch?: (query: Query) => void;
  onOpen?: (query: Query) => void;
}

const InnerAutocomplete = <T extends unknown>(
  { isMultiple, ...rest }: AutocompleteProps<T>,
  ref: Ref<HTMLLabelElement>
) =>
  isMultiple ? <Multiple ref={ref} {...rest} /> : <Basic ref={ref} {...rest} />;

export const Autocomplete = forwardRef(InnerAutocomplete) as <
  T extends boolean
>(
  p: AutocompleteProps<T> & { ref?: Ref<HTMLLabelElement> }
) => ReactElement;
