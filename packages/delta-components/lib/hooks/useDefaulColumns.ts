export const useDefaultColumns = columns =>
  columns.map(column => {
    if (!column.width) {
      if (!column.minWidth && !column.maxWidth) {
        column.minWidth = 40;
        column.width = 200;
        column.maxWidth = 400;
      } else if (column.minWidth) {
        column.width = column.minWidth + 100;
        column.maxWidth = column.minWidth + 200;
      } else if (column.maxWidth) {
        column.minWidth = Math.max(column.maxWidth - 200, 40);
        column.width = Math.max(column.maxWidth - 100, 40);
      }
    } else {
      if (!column.maxWidth) {
        column.maxWidth = column.width + 200;
      }
      if (!column.minWidth) {
        column.minWidth = Math.max(column.width - 200, 40);
      }
    }
    return column;
  });
