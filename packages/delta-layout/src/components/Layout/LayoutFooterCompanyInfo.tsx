import { jsx, ThemeUIStyleObject } from '@theme-ui/core';
import { Anchor, Box, useThemed } from 'restyler';

export interface LayoutFooterCompanyInfoProps {
  logoSrc?: string;
  companyName: string;
  companyUrl: string;
  years: [number, number];
}

export const LayoutFooterCompanyInfo = ({
  logoSrc,
  companyName,
  companyUrl,
  years
}: LayoutFooterCompanyInfoProps) => {
  const ThemedAnchor = useThemed('a', 'layout.footer.anchor');
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ThemedAnchor href={companyUrl}>
        {logoSrc && <img src={logoSrc} />}
        {companyName}
      </ThemedAnchor>
      <ThemedAnchor>
        © {years[0]} — {years[1]}
      </ThemedAnchor>
    </Box>
  );
};
