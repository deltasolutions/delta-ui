import { useEffect, useRef, useState } from "react";
import { FormManagerOptions, Schema } from "../models";
import { dereference as dereferenceByDefault, hash } from "../utils";

export const useDereferencedOptions = <T extends any>(
  options: FormManagerOptions<T>,
): FormManagerOptions<T> => {
  const updated = useRef(false);
  const dereference = options.dereference ?? dereferenceByDefault;
  const [schema, setSchema] = useState<Schema>(dereference(options.schema));
  useEffect(() => {
    if (!updated.current) {
      updated.current = true;
      return;
    }
    setSchema(dereference(options.schema));
  }, [dereference, hash(options.schema)]);
  return { ...options, schema };
};
