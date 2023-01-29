//Next
import { NextPage } from "next";

//Material
import { Box, CircularProgress } from "@mui/material";

interface Props {
  borderRadius: number;
  alignItems?: string;
}

export const LoaderComponent: NextPage<Props> = ({
  borderRadius,
  alignItems,
}) => {
  return (
    <Box
      borderRadius={borderRadius}
      display={"flex"}
      paddingY={5}
      justifyContent={"center"}
      alignItems={alignItems ? alignItems : "center"}
      position={"absolute"}
      zIndex={5}
      width={"100%"}
      height={"100%"}
      top={0}
      left={0}
      bgcolor={"rgba(255,255,255,0.6)"}
    >
      <CircularProgress size={50} color="secondary" />
    </Box>
  );
};
