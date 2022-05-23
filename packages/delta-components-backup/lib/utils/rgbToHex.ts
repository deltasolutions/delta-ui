function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(str: string) {
  const items = str.replace(/ /g, '').split(',');
  if (items.length !== 3) throw new Error('invalid rbgToHex str param');
  return (
    '#' +
    componentToHex(items[0]) +
    componentToHex(items[1]) +
    componentToHex(items[2])
  );
}
