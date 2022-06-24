import { ComponentType } from 'react';
import { FieldProps } from './FieldProps';
import { TemplateProps } from './TemplateProps';

export interface Registry {
  fields: { [key: string]: ComponentType<FieldProps> };
  templates: { [key: string]: ComponentType<TemplateProps> };
  utils: { [key: string]: (...args: any) => any };
}
