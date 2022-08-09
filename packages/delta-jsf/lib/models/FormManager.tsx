import { Dispatch, SetStateAction } from 'react';
import { FormManagerOptions } from './FormManagerOptions';
import { Validity } from './Validity';

export interface FormManager<T = any> {
  options: FormManagerOptions<T>;

  value: T;
  setValue: Dispatch<SetStateAction<T>>;

  validity: Validity;
  extendValidity: (validity: Validity | Promise<Validity>) => Promise<void>;
  flushValidity: () => void;

  valid: boolean;
  validate: () => boolean;

  submitted: boolean;
  submitRequested: boolean;
  submit: () => Promise<void>;

  /**
   * @deprecated
   */
  isValid: boolean;

  /**
   * @deprecated
   */
  isSubmitted: boolean;

  wait: () => Promise<void>;
}
