import { jsx } from '@theme-ui/core';
import { ErrorObject as AjvError } from 'ajv';
import localizeEn from 'ajv-i18n/localize/en';
import localizeRu from 'ajv-i18n/localize/ru';
import {
  defaults as basicJsFormDefaults,
  Form as BasicJsFrom,
  FormProps as BasicJsFromProps,
  ValidateAgainstSchemaOptions,
  validateAgainstSchemaViaAjv,
} from 'delta-jsf';
import { Fragment, useCallback, useMemo } from 'react';
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
  return {
    registry: {
      fields: { ...fields, ...customFields },
      templates: { ...templates, ...customTemplates },
      utils: {
        ...utils,
        validateAgainstSchema,
      },
    },
  };
};

export type JsFormProps<T = any> = BasicJsFromProps<T>;

export const JsForm = (props: JsFormProps) => {
  const { children, ...rest } = props as any;
  const { registry } = useJsFormDefaults();
  return (
    <BasicJsFrom {...rest} registry={registry}>
      {children ?? <Fragment />}
    </BasicJsFrom>
  );
};
