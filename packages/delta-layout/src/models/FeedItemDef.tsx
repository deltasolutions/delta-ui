export interface FeedItemDef {
  id: string;
  componentId: string;
  managerComponentId?: string;
  [prop: string]: string | undefined;
}
