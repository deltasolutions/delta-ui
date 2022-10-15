import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFieldProps } from '../../../docs/utils';
import { ArrayField } from './ArrayField';

const meta: Meta = {
  title: 'fields/ComplexExample',
  ...formStoryParameters,
};

export default meta;

export const Basics = props => {
  const fieldProps = useStoryFieldProps(props, ['1', '2']);
  return (
    <ArrayField
      schema={{
        items: {
          properties: {
            conditions: {
              items: {
                allOf: [
                  {
                    properties: {
                      field: {
                        layout: {
                          field: 'select',
                        },
                        oneOf: [
                          {
                            const: 'importance',
                            title: 'Importance',
                          },
                          {
                            const: 'time',
                            title: 'Time',
                          },
                          {
                            const: 'text',
                            title: 'Text',
                          },
                          {
                            const: 'type',
                            title: 'Type',
                          },
                        ],
                        title: 'Field',
                        type: 'string',
                      },
                      type: {
                        layout: {
                          field: 'select',
                        },
                        oneOf: [
                          {
                            const: '<',
                          },
                          {
                            const: '>',
                          },
                          {
                            const: '==',
                          },
                          {
                            const: '!=',
                          },
                          {
                            const: 'in',
                          },
                        ],
                        title: 'Type',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  {
                    if: {
                      properties: {
                        field: {
                          const: 'importance',
                        },
                      },
                      required: ['field'],
                      type: 'object',
                    },
                    then: {
                      properties: {
                        value: {
                          layout: {
                            field: 'select',
                          },
                          oneOf: [
                            {
                              const: 'INFO',
                            },
                            {
                              const: 'WARN',
                            },
                            {
                              const: 'CRIT',
                            },
                          ],
                          title: 'Value',
                          type: 'string',
                        },
                      },
                      required: ['value'],
                      type: 'object',
                    },
                  },
                  {
                    if: {
                      properties: {
                        field: {
                          const: 'type',
                        },
                      },
                      required: ['field'],
                      type: 'object',
                    },
                    then: {
                      properties: {
                        value: {
                          layout: {
                            field: 'select',
                          },
                          oneOf: [
                            {
                              const: 'AUDIT',
                            },
                            {
                              const: 'SEL',
                            },
                          ],
                          title: 'Value',
                          type: 'string',
                        },
                      },
                      required: ['value'],
                      type: 'object',
                    },
                  },
                  {
                    if: {
                      properties: {
                        field: {
                          const: 'time',
                        },
                      },
                      required: ['field'],
                      type: 'object',
                    },
                    then: {
                      properties: {
                        value: {
                          layout: {
                            dateTime: 'DD-MM-YYYY HH:mm',
                          },
                          title: 'Value',
                          type: 'string',
                        },
                      },
                      required: ['value'],
                      type: 'object',
                    },
                  },
                  {
                    if: {
                      properties: {
                        field: {
                          const: 'text',
                        },
                      },
                      required: ['field'],
                      type: 'object',
                    },
                    then: {
                      properties: {
                        value: {
                          title: 'Value',
                          type: 'string',
                        },
                      },
                      required: ['value'],
                      type: 'object',
                    },
                  },
                ],
                required: ['type', 'field'],
                type: 'object',
              },
              layout: {
                hasPadding: true,
                isPageable: true,
              },
              title: 'Conditions',
              type: 'array',
            },
            targets: {
              items: {
                properties: {
                  attributes: {
                    default: [],
                    items: {
                      properties: {
                        name: {
                          layout: {
                            field: 'select',
                          },
                          oneOf: [
                            {
                              const: 'recipient',
                              title: 'Recipient',
                            },
                            {
                              const: 'text',
                              title: 'Text',
                            },
                            {
                              const: 'url',
                              title: 'Url',
                            },
                            {
                              const: 'username',
                              title: 'Username',
                            },
                            {
                              const: 'password',
                              title: 'Password',
                            },
                            {
                              const: 'mailFrom',
                              title: 'Mail From',
                            },
                            {
                              const: 'verbose',
                              title: 'Verbose',
                            },
                            {
                              const: 'sslVerifyhost',
                              title: 'SSL Verifyhost',
                            },
                            {
                              const: 'sslVerifypeer',
                              title: 'SSL Verifypeer',
                            },
                          ],
                          title: 'Name',
                          type: 'string',
                        },
                        value: {
                          minLength: 1,
                          title: 'Value',
                          type: 'string',
                        },
                      },
                      required: ['name', 'value'],
                      type: 'object',
                    },
                    layout: {
                      hasPadding: true,
                      isPageable: true,
                    },
                    title: 'Attributes',
                    type: 'array',
                  },
                  type: {
                    layout: {
                      field: 'select',
                    },
                    oneOf: [
                      {
                        const: 'SMTP',
                      },
                      {
                        const: 'SNMP',
                      },
                    ],
                    title: 'Type',
                    type: 'string',
                  },
                },
                required: ['type', 'attributes'],
                type: 'object',
              },
              layout: {
                hasPadding: true,
                isPageable: true,
              },
              title: 'Targets',
              type: 'array',
            },
          },
          required: ['targets', 'conditions'],
          type: 'object',
        },
        layout: {
          isPageable: true,
        },
        title: 'Notification Destination',
        type: 'array',
      }}
      {...fieldProps}
    />
  );
};
