import { ComponentType } from 'react';

export interface FeedComponentDef {
  id: string;
  title: string;
  description?: string;
  component: ComponentType;
}
