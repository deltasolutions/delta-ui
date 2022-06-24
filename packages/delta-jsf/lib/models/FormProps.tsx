import { FormHTMLAttributes, ReactNode } from 'react';
import { FormManager } from './FormManager';

export interface FormProps<T = any>
  extends Pick<
    FormHTMLAttributes<HTMLFormElement>,
    'style' | 'className' | 'id'
  > {
  manager: FormManager<T>;
  children?: ReactNode | ReactNode[];
}
