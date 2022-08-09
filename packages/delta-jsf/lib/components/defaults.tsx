import { validateAgainstSchemaViaAjv } from '../utils';
import {
  ArrayField,
  InputField,
  DomainField,
  NullField,
  ObjectField,
  SelectField,
} from './fields';
import { ArrayTemplate, PanicTemplate, createFieldTemplate } from './templates';

export const defaults = {
  registry: {
    fields: {
      array: ArrayField,
      domain: DomainField,
      hidden: NullField,
      integer: InputField,
      null: NullField,
      number: InputField,
      object: ObjectField,
      select: SelectField,
      string: InputField,
    },
    templates: {
      PanicTemplate,
      ArrayTemplate,
      PrimitiveTemplate: createFieldTemplate('djsf-primitive'),
      ObjectTemplate: createFieldTemplate('djsf-object'),
    },
    utils: {
      validateAgainstSchema: validateAgainstSchemaViaAjv,
    },
  },
};
