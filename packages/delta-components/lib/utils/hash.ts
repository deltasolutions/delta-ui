export const hash = item => {
  let hash = 0;
  for (let i = 0; i < item.length; i++) {
    let char = item.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};
