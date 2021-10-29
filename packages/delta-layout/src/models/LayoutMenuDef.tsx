export interface LayoutMenuDef {
  entries: LayoutMenuEntryDef[];
  activeIds: string[];
}

export interface LayoutMenuEntryDef {
  id: string;
  title: string;
  subs?: LayoutMenuEntryDef[];

  // Will be added later.
  // icon?: string;
}
