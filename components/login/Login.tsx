import { Box, Button, Grid, Typography } from "@mui/material";

/* Components */
import { InputComponent } from "./Input";
import { ShareComponent } from "./Share";

/* Styles */
import { colors } from "../../themes";

const LoginComponent = () => {
  return (
    <Grid item xs={12} sm={12} md={5} sx={{ height: "100vh" }}>
      <Box sx={{ height: "100vh", background: colors.secondary }}>
        <Box display={"flex"} padding={2} flex={1} justifyContent={"flex-end"}>
          <Button
            variant="outlined"
            color={"info"}
            sx={{ marginRight: "20px" }}
          >
            Itaa.cl
          </Button>
        </Box>
        <Box
          paddingBottom={5}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          flex={1}
          sx={{
            height: `calc(100vh - 70px)`,
          }}
        >
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Typography
              color="info"
              variant="h2"
              fontSize={22}
              sx={{ color: colors.info }}
            >
              ¡ Bienvenido !
            </Typography>

            <Typography
              color="info"
              variant="h2"
              fontSize={18}
              fontWeight={200}
              sx={{
                color: colors.info,
                marginTop: "10px",
              }}
            >
              Dashboard informativo
            </Typography>
            <InputComponent />
            <ShareComponent />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginComponent;
