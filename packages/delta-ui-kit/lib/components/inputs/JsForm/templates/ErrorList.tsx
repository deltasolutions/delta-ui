import { jsx } from "@theme-ui/core";
import { Validity } from "delta-jsf";
import { Box } from "../../../containers";

export interface ErrorListProps {
  validity?: Validity;
}

export const ErrorList = ({
  validity: { errors = [] } = {},
}: ErrorListProps) => {
  if (errors.length < 1) {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        color: "error",
        fontWeight: 600,
      }}
    >
      {Array.from(new Set(errors)).map((e) => <Box key={e}>{e}</Box>)}
    </Box>
  );
};
