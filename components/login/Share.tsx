import { Box, Link, Typography } from "@mui/material";

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
        <Link
          display={"flex"}
          alignItems="center"
          border={"solid 1px white"}
          justifyContent="space-between"
          padding={1}
          width={110}
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.somni"
          underline="hover"
          sx={{
            "&:hover": {
              color: "info.light",
              cursor: "pointer",
            },
          }}
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
        </Link>

        <Link
          display={"flex"}
          alignItems="center"
          border={"solid 1px white"}
          justifyContent="space-between"
          padding={1}
          width={110}
          target="_blank"
          href="https://apps.apple.com/cl/app/somni/id1632049297?l=en"
          underline="hover"
          sx={{
            "&:hover": {
              color: "info.light",
              cursor: "pointer",
            },
          }}
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
        </Link>
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
