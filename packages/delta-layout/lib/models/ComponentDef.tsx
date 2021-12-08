import { ComponentType } from 'react';

export interface ComponentDef {
  id: string;
  title: string;
  description?: string;
  component: ComponentType;
}
