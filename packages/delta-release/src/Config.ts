export interface Config {
  increment:
    | 'major'
    | 'premajor'
    | 'minor'
    | 'preminor'
    | 'patch'
    | 'prepatch'
    | 'prerelease';
  message: string;
  script?: string;
  tag?: string;
  publish?: boolean;
  preview?: boolean;
}

export const configSchema = {
  type: 'object',
  properties: {
    increment: {
      type: 'string',
      enum: [
        'major',
        'premajor',
        'minor',
        'preminor',
        'patch',
        'prepatch',
        'prerelease'
      ]
    },
    message: { type: 'string' },
    script: { type: 'string' },
    tag: { type: 'string' },
    publish: { type: 'boolean' },
    preview: { type: 'boolean' }
  },
  required: ['increment', 'message'],
  additionalProperties: false
};
