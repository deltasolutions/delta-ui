import { Dispatch, SetStateAction } from 'react';
import { Registry } from './Registry';
import { Schema } from './Schema';
import { Validity } from './Validity';

export interface FieldProps<FieldValue = any> {
  schema: Schema;
  registry: Registry;
  required?: boolean;
  value?: FieldValue;
  validity?: Validity;
  onValue?: Dispatch<SetStateAction<FieldValue>>;
  onValidity?: (validity: Validity | Promise<Validity>) => void;
}
