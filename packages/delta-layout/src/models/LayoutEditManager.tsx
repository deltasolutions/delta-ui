export interface LayoutEditManager {
  updates: {
    [target: string]: any;
  };
  edit: (targets: string[]) => void;
  save: (targets?: string[]) => void;
  cancel: (targets?: string[]) => void;
}

export enum LayoutEditTarget {
  Feed = 'feed',
  FeedItemTitle = 'feedItemTitle'
}
