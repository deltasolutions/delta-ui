export interface DataTableTabDef {
  name: string;
  columnOrder?: string[];
  columnSizes?: { [key: string]: number };
  columnExclusions?: string[];
}
