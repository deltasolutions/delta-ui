import Ajv from 'ajv';
import { Schema } from '../models';
import { clone } from './clone';
import { isObject } from './guards';
import { merge } from './merge';

const ajv = new Ajv();

export const getCompressed = (
  schema: Schema,
  value: any
): Pick<Schema, 'properties' | 'required'> => {
  const additionals = (schema.allOf ?? []).reduce((prev, curr) => {
    return typeof curr === 'object' ? [...prev, curr] : prev;
  }, [] as Pick<Schema, 'properties' | 'required'>[]);
  const conditionals = value
    ? [schema, ...(schema.allOf ?? [])].reduce((prev, curr) => {
        if (typeof curr !== 'object' || typeof curr.if !== 'object') {
          return prev;
        }
        const validate = ajv.compile(curr.if);
        const target = validate(value) ? curr.then : curr.else;
        return isObject(target) ? [...prev, target] : prev;
      }, [] as Pick<Schema, 'properties' | 'required'>[])
    : [];
  return [schema, ...additionals, ...conditionals].reduce(
    (prev, curr) => {
      return {
        properties: merge(prev.properties, clone(curr.properties)),
        required: Array.from(
          new Set([...(prev.required ?? []), ...(curr.required ?? [])])
        ),
      } as Pick<Schema, 'properties' | 'required'>;
    },
    {
      properties: {},
      required: [],
    } as Pick<Schema, 'properties' | 'required'>
  );
};
