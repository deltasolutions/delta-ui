import Ajv, { ErrorObject as AjvError } from 'ajv';
import { ValidateAgainstSchemaOptions, Validity } from '../models';
import { get } from './get';
import { set } from './set';

export interface ValidateAgainstSchemaViaAjvOptions
  extends ValidateAgainstSchemaOptions {
  transformAjvErrors?: (errors: AjvError[]) => AjvError[];
  ajv?: Ajv;
}
const defaultAjv = new Ajv({
  strict: 'log',
  allErrors: true,
  keywords: ['layout'],
});

export const validateAgainstSchemaViaAjv = ({
  schema,
  value,
  transformAjvErrors,
  ...rest
}: ValidateAgainstSchemaViaAjvOptions): Validity => {
  const { ajv: propsAjv } = rest;
  const ajv = propsAjv ?? defaultAjv;
  try {
    const validateViaAjv = ajv.compile(schema);
    validateViaAjv(value);
    const ajvErrors =
      transformAjvErrors?.(validateViaAjv.errors ?? []) ??
      validateViaAjv.errors ??
      [];
    let validity =
      ajvErrors.reduce((prev, curr) => {
        const path = curr.instancePath
          .replace(/\/(\D)/g, '/properties/$1')
          .replace(/\/(\d)/g, '/items/$1')
          .split('/')
          .map(v => v.replace(/~0/g, '~').replace(/~1/g, '/'))
          .slice(1)
          .concat(
            curr.keyword === 'required' && curr.params?.missingProperty
              ? ['properties', curr.params.missingProperty]
              : []
          );
        path.push('errors');
        const existingValue = get(prev, path) ?? [];
        set(
          prev,
          path,
          existingValue.includes(curr.message)
            ? existingValue
            : [...existingValue, curr.message]
        );

        return prev;
      }, {}) ?? {};
    return validity;
  } catch (e) {
    console.warn(e);
    return {};
  }
};
