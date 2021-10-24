import { ComponentType } from 'react';

export interface FeedComponentDef {
  id: string;
  type: FeedComponentType;
  component: ComponentType;
}

export enum FeedComponentType {
  Item = 'item',
  ItemManager = 'itemManager'
}
