import { useEffect } from "react";

//Next
import { NextPage } from "next";

//Material
import { Box, CircularProgress, Typography } from "@mui/material";
import { IState } from "../../interfaces/state";

//redux
import { useLogOutMutation } from "../../services/login";
import { useRouter } from "next/router";

interface Props {
  isError: boolean;
  seeError: boolean;
  error: string;
  resetState: () => void;
}

export const Loader: NextPage<Props> = ({
  isError,
  seeError,
  error,
  resetState,
}) => {
  const [logOut, result] = useLogOutMutation();

  const { push } = useRouter();

  useEffect(() => {
    if (isError && !seeError) {
      logOut({});
      resetState();
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      flexDirection={"column"}
      sx={{
        minHeight: `calc(100vh - 70px)`,
      }}
    >
      <CircularProgress size={50} color="secondary" />
      <Typography
        color="info"
        variant="body2"
        fontSize={16}
        fontWeight={600}
        sx={{ color: "main", marginTop: "10px" }}
      >
        Cargando...
      </Typography>
      {seeError && (
        <Typography
          color="info"
          variant="body2"
          fontSize={16}
          fontWeight={600}
          sx={{ color: "error.main", marginTop: "10px" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
