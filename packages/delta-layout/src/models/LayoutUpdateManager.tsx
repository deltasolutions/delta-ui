export interface LayoutUpdateManager {
  updates: {
    [target: string]: any;
  };
  update: (target: string, data: any) => void;
  allow: (targets: string[]) => void;
  save: (targets?: string[]) => void;
  cancel: (targets?: string[]) => void;
  checkIfUpdating: (target: string) => boolean;
}

export enum LayoutUpdateTarget {
  Feed = 'feed',
  FeedItemTitle = 'feedItemTitle'
}
