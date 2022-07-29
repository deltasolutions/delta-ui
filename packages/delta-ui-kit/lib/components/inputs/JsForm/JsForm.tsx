import { ErrorObject as AjvError } from 'ajv';
import localizeEn from 'ajv-i18n/localize/en';
import localizeRu from 'ajv-i18n/localize/ru';
import {
  clone,
  defaults as basicJsFormDefaults,
  Form as JsForm,
  merge,
  useFormManager as useBasicJsFormManager,
  validateAgainstSchemaViaAjv,
} from 'delta-jsf';
// It seems that esbuild fails to differ
// type imports from usual ones when alias is used.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type {
  FormManager as JsFormManager,
  FormManagerOptions as JsFormManagerOptions,
  FormProps as JsFormProps,
  ValidateAgainstSchemaOptions,
} from 'delta-jsf';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { jsFormFields as customFields } from './fields';
import { jsFormTemplates as customTemplates } from './templates';

const { fields, templates, utils } = basicJsFormDefaults.registry;

export const useJsFormDefaults = () => {
  const { i18n } = useTranslation();
  const transformAjvErrors = useMemo(() => {
    const localize = ({
      en: localizeEn,
      ru: localizeRu,
    }[i18n.language] ?? (v => v)) as (es: AjvError[]) => AjvError[];
    return (es: AjvError[]) => {
      localize(es);
      es.forEach(e => {
        e.message = e.message
          ? e.message.charAt(0).toUpperCase() + e.message.slice(1)
          : undefined;
      });
      return es;
    };
  }, [i18n.language]);
  const validateAgainstSchema = useCallback(
    (options: ValidateAgainstSchemaOptions) =>
      validateAgainstSchemaViaAjv({ ...options, transformAjvErrors }),
    [transformAjvErrors]
  );
  return useMemo(
    () => ({
      registry: {
        fields: { ...fields, ...customFields },
        templates: { ...templates, ...customTemplates },
        utils: {
          ...utils,
          validateAgainstSchema,
        },
      },
    }),
    [i18n.language, validateAgainstSchema]
  );
};

const useJsFormManager = <
  T extends unknown,
  O extends JsFormManagerOptions<T> = JsFormManagerOptions<T>
>(
  options: O
) => {
  const defaults = useJsFormDefaults();
  const mergedOptions = useMemo(
    () => merge(clone(defaults), options),
    [defaults, options]
  );
  return useBasicJsFormManager(mergedOptions) as O extends {
    initialValue: T;
  }
    ? JsFormManager<T>
    : JsFormManager<T | undefined>;
};

export { JsForm, useJsFormManager, validateAgainstSchemaViaAjv };

export type {
  JsFormManager,
  JsFormManagerOptions,
  JsFormProps,
  ValidateAgainstSchemaOptions,
};
