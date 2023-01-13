import { Box, Typography } from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import TwitterIcon from "@mui/icons-material/Twitter";

export const ShareComponent = () => {
  return (
    <>
      <Typography
        color="info"
        variant="h3"
        fontSize={14}
        marginTop={5}
        textAlign={"center"}
        fontWeight={400}
        sx={{
          color: "#ffffff",
        }}
      >
        Descarga Somni
      </Typography>
      <Box
        display={"flex"}
        width={252}
        marginTop={2}
        justifyContent="space-between"
      >
        <Box
          display={"flex"}
          alignItems="center"
          border={"solid 1px white"}
          justifyContent="space-between"
          padding={1}
          width={110}
        >
          <GoogleIcon sx={{ color: "#ffffff" }} />{" "}
          <Typography
            color="info"
            variant="h4"
            fontSize={14}
            textAlign={"center"}
            fontWeight={100}
            sx={{
              color: "#ffffff",
            }}
          >
            Play store
          </Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems="center"
          border={"solid 1px white"}
          justifyContent="space-between"
          padding={1}
          width={110}
        >
          <AppleIcon sx={{ color: "#ffffff" }} />{" "}
          <Typography
            color="info"
            variant="h4"
            fontSize={14}
            textAlign={"center"}
            fontWeight={100}
            sx={{
              color: "#ffffff",
            }}
          >
            App Store
          </Typography>
        </Box>
      </Box>

      <Box
        display={"flex"}
        width={252}
        marginTop={3}
        justifyContent="space-between"
      >
        <Box display={"flex"} alignItems="center" justifyContent="space-around">
          <LinkedInIcon
            sx={{
              color: "#ffffff",
              "&:hover": {
                color: "tomato",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box display={"flex"} alignItems="center" justifyContent="space-around">
          <FacebookIcon
            sx={{
              color: "#ffffff",
              "&:hover": {
                color: "tomato",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box display={"flex"} alignItems="center" justifyContent="space-around">
          <WhatsAppIcon
            sx={{
              color: "#ffffff",
              "&:hover": {
                color: "tomato",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box display={"flex"} alignItems="center" justifyContent="space-around">
          <MailIcon
            sx={{
              color: "#ffffff",
              "&:hover": {
                color: "tomato",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box display={"flex"} alignItems="center" justifyContent="space-around">
          <TwitterIcon
            sx={{
              color: "#ffffff",
              "&:hover": {
                color: "tomato",
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};
