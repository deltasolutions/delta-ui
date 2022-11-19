import Ajv from 'ajv';
import { Schema } from '../models';
import { clone } from './clone';
import { get } from './get';
import { merge } from './merge';

const ajv = new Ajv();

export function getCompressed(schema: Schema, value: unknown): Schema {
  if (!isWalkable(schema)) {
    return schema;
  }
  schema;
  const {
    allOf: schemaAllOf,
    if: schemaIf,
    then: schemaThen,
    else: schemaElse,
    ...schemaRest
  } = schema;
  const compressedIf = (() => {
    if (!schemaIf && (!schemaThen || !schemaElse)) {
      return {};
    }
    const validate = ajv.compile(schemaIf as any); // FIXME
    const validated = validate(value) ? schemaThen : schemaElse;
    return getCompressed(validated as Schema, value);
  })();
  const compressedAllOf = Array.isArray(schemaAllOf)
    ? schemaAllOf.map(v => getCompressed(v, value))
    : [];
  const compressedSchema = [
    schemaRest,
    compressedIf,
    ...compressedAllOf,
  ].reduce(
    (p: { [key: string]: unknown }, v) => (isWalkable(v) ? merge(p, v) : p),
    {}
  ) as { [key: string]: unknown };
  if (isWalkable(compressedSchema.properties)) {
    for (const [schemaKey, schemaValue] of Object.entries(
      compressedSchema.properties
    )) {
      compressedSchema.properties[schemaKey] = getCompressed(
        schemaValue as Schema,
        get(value as any, schemaKey)
      );
    }
  }
  // TODO: Handle item schema via validating EVERY datum against it.
  // if (isWalkable(compressedSchema.items)) {}
  return compressedSchema;
}

function isWalkable(data: unknown): data is { [key: string]: unknown } {
  return Boolean(data && typeof data === 'object');
}
