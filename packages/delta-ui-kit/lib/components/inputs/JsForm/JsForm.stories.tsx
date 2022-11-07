import { jsx } from '@theme-ui/core';
import Ajv, { ErrorObject as AjvError } from 'ajv';
import addFormats from 'ajv-formats';
import localizeEn from 'ajv-i18n/localize/en';
import localizeRu from 'ajv-i18n/localize/ru';
import {
  clone,
  hash,
  merge,
  ValidateAgainstSchemaOptions,
  validateAgainstSchemaViaAjv,
} from 'delta-jsf';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createFormStory, formStoryMeta } from '../../../../docs/utils';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { JsForm, useJsFormManager } from './JsForm';

export default {
  ...formStoryMeta,
  title: 'JsForm/General',
};

export const Basics = createFormStory({
  schema: {
    type: 'object',
    properties: {
      text: {
        title: 'Text',
        type: 'string',
        description: 'Description',
      },
      textWithDefaults: {
        title: 'Text With Defaults',
        type: 'string',
      },
      switch: {
        title: 'Switch',
        type: 'boolean',
      },
      select: {
        title: 'Select',
        type: 'string',
        oneOf: [
          {
            title: 'A',
            const: 'aaa',
          },
          {
            title: 'B',
            const: 'bbb',
          },
        ],
        layout: {
          field: 'select',
        },
      },
    },
    required: ['select'],
  },
  initialValue: {
    text: 'abcd',
  },
});

export const Array = createFormStory({
  schema: {
    type: 'object',
    properties: {
      username: {
        title: 'Username',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      roles: {
        title: 'Roles',
        type: 'array',
        items: {
          title: 'Name',
          type: 'string',
        },
      },
    },
  },
  initialValue: {},
});

export const LoginForm = createFormStory({
  schema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        title: 'Username',
      },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 8,
      },
    },
    required: ['username', 'password'],
  },
  initialValue: { username: 'root', password: '' },
});

const ajv = new Ajv({
  strict: 'log',
  formats: { date: true, time: true },
  allErrors: true,
  keywords: ['layout'],
});
addFormats(ajv, { mode: 'full' });
ajv.addFormat('url', {
  type: 'string',
  validate: x => /^(ftp|http|https):\/\/[^ "]+$/.test(x),
});

const useExternalJsFormManagerDefaults = () => {
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
      validateAgainstSchemaViaAjv({
        ...options,
        ajv,
        transformAjvErrors,
      }),
    [ajv, transformAjvErrors]
  );
  return {
    registry: {
      utils: { validateAgainstSchema },
    },
  };
};

const useExternalJsFormManager = options => {
  const externalDefaults = useExternalJsFormManagerDefaults();
  const mergedOptions = useMemo(
    () => merge(clone(externalDefaults), options),
    [hash(options), externalDefaults]
  );
  return useJsFormManager(mergedOptions);
};

export const External = () => {
  const manager = useExternalJsFormManager({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'Username',
        },
        password: {
          type: 'string',
          title: 'Password',
          minLength: 8,
        },
        url: {
          type: 'string',
          format: 'url',
        },
      },
      required: ['username', 'password', 'ipv4'],
    },
    initialValue: {},
  });
  return (
    <Box>
      <JsForm manager={manager}>
        <Button sx={{ mt: 3 }} type="submit" variant="contained-dimmed">
          Submit
        </Button>
      </JsForm>
    </Box>
  );
};
