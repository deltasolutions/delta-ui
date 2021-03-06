import { Registry } from "./Registry";
import { Schema } from "./Schema";
import { Validity } from "./Validity";

export interface FormManagerOptions<T = any> {
  initialValue?: T;
  schema: Schema;
  registry?: Partial<Registry>;
  liveValidated?: boolean;
  dereference?: (schema: Schema) => Schema;
  onValue?: (value: T) => void;
  onValidity?: (validation: Validity) => void;
  onSubmit?: (value: T) => void;
}
