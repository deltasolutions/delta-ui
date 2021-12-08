import { Schema } from '../models';
import { clone } from './clone';
import { isObject } from './guards';
import { merge } from './merge';

export const getProperties = (schema: Schema): Schema['properties'] => {
  return [schema, ...(schema.allOf ?? [])].reduce((prev, curr) => {
    if (isObject(curr) && isObject(curr.properties)) {
      merge(prev, clone(curr.properties));
    }
    return prev;
  }, {} as Schema['properties']);
};
