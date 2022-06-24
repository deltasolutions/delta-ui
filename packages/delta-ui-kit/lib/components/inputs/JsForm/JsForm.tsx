import { ErrorObject as AjvError } from 'ajv';
import localizeEn from 'ajv-i18n/localize/en';
import localizeRu from 'ajv-i18n/localize/ru';
import {
  defaults as basicJsFormDefaults,
  Form as JsForm,
  FormProps as JsFormProps,
  FormManager as JsFormManager,
  FormManagerOptions as JsFormManagerOptions,
  useFormManager as useBasicJsFormManager,
  ValidateAgainstSchemaOptions,
  validateAgainstSchemaViaAjv,
} from 'delta-jsf';
import merge from 'lodash-es/merge';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fields as customFields } from './fields';
import { templates as customTemplates } from './templates';

const { fields, templates, utils } = basicJsFormDefaults.registry;

export const useJsFormDefaults = () => {
  const { i18n } = useTranslation();
  const transformAjvErrors = useMemo(
    () =>
      (({
        en: localizeEn,
        ru: localizeRu,
      }[i18n.language] ?? (v => v)) as (es: AjvError[]) => AjvError[]),
    [i18n.language]
  );
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
    () => merge({}, defaults, options),
    [defaults, options]
  );
  return useBasicJsFormManager(mergedOptions) as O extends {
    initialValue: T;
  }
    ? JsFormManager<T>
    : JsFormManager<T | undefined>;
};

export {
  JsForm,
  JsFormProps,
  JsFormManager,
  JsFormManagerOptions,
  useJsFormManager,
  ValidateAgainstSchemaOptions,
  validateAgainstSchemaViaAjv,
};
