export interface LayoutMenuDef {
  entries: LayoutMenuEntryDef[];
  activeIds: string[];
}

export interface LayoutMenuEntryDef {
  id: string;
  title: string;
  icon?: string;
  subs?: LayoutMenuEntryDef[];
}
