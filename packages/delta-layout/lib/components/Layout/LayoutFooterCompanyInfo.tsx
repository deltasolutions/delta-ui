import { jsx } from '@theme-ui/core';
import { Box, useThemed } from 'restyler';

export interface LayoutFooterCompanyInfoProps {
  companyName: string;
  companyUrl: string;
  year: number;
}

export const LayoutFooterCompanyInfo = ({
  companyName,
  companyUrl,
  year
}: LayoutFooterCompanyInfoProps) => {
  const ThemedAnchor = useThemed('a', 'layout.footer.anchor');
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ThemedAnchor href={companyUrl}>{companyName}</ThemedAnchor>
      <ThemedAnchor>© {year}</ThemedAnchor>
    </Box>
  );
};
