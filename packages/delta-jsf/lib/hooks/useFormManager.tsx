import { useCallback, useEffect, useMemo, useState } from "react";
import { defaults } from "../components";
import { ValidateAgainstSchemaFunction, Validity } from "../models";
import { FormManager, FormManagerOptions } from "../models";
import { checkValidity, clone, merge } from "../utils";
import { useDereferencedOptions } from "./useDereferencedOptions";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useMergeQueue } from "./useMergeQueue";

export const useFormManager = <
  T extends unknown,
  Options extends FormManagerOptions<T> = FormManagerOptions<T>,
>(
  options: Options,
): Options extends { initialValue: T } ? FormManager<T>
  : FormManager<T | undefined> => {
  const dereferencedOptions = useDereferencedOptions(options);
  const {
    schema,
    initialValue,
    registry,
    liveValidated,
    onValue,
    onValidity,
    onSubmit,
  } = dereferencedOptions;
  const validateAgainstSchema: ValidateAgainstSchemaFunction =
    registry?.utils?.validateAgainstSchema ??
      defaults.registry.utils.validateAgainstSchema;

  const [value, setValue] = useState(initialValue);

  const [schemaValidity, setSchemaValidity] = useState<Validity>({});
  const [extensionValidity, extendValidity, wait] = useMergeQueue<Validity>({});
  const [validity, setValidity] = useState<Validity>({});
  const flushValidity = useCallback(() => {
    const validity = merge(clone(schemaValidity), clone(extensionValidity));
    setValidity(validity);
    return validity;
  }, [schemaValidity, extensionValidity]);

  const valid = useMemo(() => checkValidity(validity), [validity]);
  const validate = useCallback(
    () => {
      const validity = validateAgainstSchema({ schema, value });
      setSchemaValidity(validity);
    },
    [schema, value],
  );

  const [submitted, setSubmitted] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);
  const submit = useCallback(async () => {
    await wait();
    validate();
    setSubmitRequested(true);
  }, [validate]);

  useEffect(() => {
    if (!submitRequested) {
      return;
    }
    setSubmitRequested(false);
    const validity = flushValidity();
    const valid = checkValidity(validity);
    if (valid) {
      onSubmit?.(value as T);
      setSubmitted(true);
    }
  }, [submitRequested]);

  useIsomorphicLayoutEffect(() => {
    onValue?.(value as T);
  }, [value]);

  useIsomorphicLayoutEffect(() => {
    onValidity?.(validity);
  }, [validity]);

  useIsomorphicLayoutEffect(() => {
    validate();
  }, [validate]);

  useEffect(() => {
    liveValidated && flushValidity();
  }, [liveValidated, flushValidity]);

  return {
    options: dereferencedOptions,

    value,
    setValue,

    validity,
    extendValidity,
    flushValidity,

    valid,
    validate,

    submitted,
    submitRequested,
    submit,

    isValid: valid,
    isSubmitted: submitted,

    wait,
  } as any;
};
