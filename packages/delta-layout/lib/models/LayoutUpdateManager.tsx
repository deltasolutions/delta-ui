export interface LayoutUpdateManager {
  updates: {
    [target: string]: any;
  };
  allow: (targets: string[]) => void;
  cancel: (targets?: string[]) => void;
  checkIfUpdating: (target: string) => boolean;
  save: (targets?: string[]) => void;
  update: (target: string, data: any) => void;
}

export enum LayoutUpdateTarget {
  Feed = 'feed'
}
