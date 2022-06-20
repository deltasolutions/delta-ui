import React from 'react';
import { TemplateProps } from '../../models';
import { ErrorList } from './ErrorList';

export function createFieldTemplate(topClassName: string) {
  return function ({ children, schema, validity, required }: TemplateProps) {
    return (
      <div className={topClassName}>
        {schema.title && (
          <div className="title">
            {schema.title}
            {required ? ' *' : ''}
          </div>
        )}
        <div className="content">{children}</div>
        <ErrorList validity={validity} />
      </div>
    );
  };
}
