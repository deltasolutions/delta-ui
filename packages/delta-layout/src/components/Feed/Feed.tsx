import { BoxProps, useThemed } from "restyler";

export const Feed = (props: BoxProps) => {
  const ThemedFeed = useThemed('div', 'feed');
  return <ThemedFeed {...props} />;
};
