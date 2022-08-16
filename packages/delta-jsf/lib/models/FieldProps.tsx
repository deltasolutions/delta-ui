import { Registry } from './Registry';
import { Schema } from './Schema';
import { Validity } from './Validity';

export interface FieldProps<FieldValue = any> {
  schema: Schema;
  registry: Registry;
  required?: boolean;
  value?: FieldValue;
  validity?: Validity;
  onValue?: (value: FieldValue) => void;
  onValidity?: (validity: Validity | Promise<Validity>) => void;
}
