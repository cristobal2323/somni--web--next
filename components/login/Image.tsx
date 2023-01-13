import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";

const ImageComponent = () => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={7}
      sx={{ display: { xs: "none", sm: "none", md: "block" }, height: "100vh" }}
    >
      <Box padding={"16px"} display={"flex"} alignItems={"center"}>
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={40}
          height={40}
        />
        <Typography
          color="secondary"
          variant="h1"
          marginTop={1}
          fontSize={22}
          fontWeight={700}
        >
          Somni
        </Typography>
      </Box>

      <Box
        paddingBottom={5}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        flex={1}
        sx={{
          height: `calc(100vh - 80px)`,
        }}
      >
        <section>
          <Box
            display={"flex"}
            flex={1}
            justifyContent={"center"}
            sx={{ height: { md: "300px", lg: "400px" } }}
            width={"100%"}
            position={"relative"}
          >
            <Box
              position={"absolute"}
              width={"100%"}
              sx={{ height: { md: "300px", lg: "400px" } }}
            >
              <Image
                style={{ objectFit: "contain" }}
                src="/fatigue.jpg"
                fill
                alt="Imagen fatiga"
              />
            </Box>
          </Box>
          <Box
            display={"flex"}
            flex={1}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography
              color="secondary"
              variant="h2"
              fontSize={22}
              fontWeight={200}
              textTransform={"uppercase"}
            >
              Somni plataforma para clientes
            </Typography>
            <Typography
              color="primary"
              variant="h2"
              marginTop={1}
              fontSize={16}
              fontWeight={200}
              textTransform={"uppercase"}
            >
              Cuida a tus trabajadores.
            </Typography>
          </Box>
        </section>
      </Box>
    </Grid>
  );
};

export default ImageComponent;
