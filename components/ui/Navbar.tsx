import { useState, useEffect } from "react";
import Image from "next/image";

//Material
import { Box, IconButton, Link, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//Redux
import { useDispatch } from "react-redux";
import { toogleMenu, openMenu, closeMenu } from "../../slices/homeSlice";

export const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);

    if (window.innerWidth > 899) {
      dispatch(openMenu());
    } else {
      dispatch(closeMenu());
    }
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 899) {
      dispatch(openMenu());
    } else {
      dispatch(closeMenu());
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"space-between"}
      sx={{
        backgroundColor: "secondary.main",
      }}
    >
      <Box
        padding={"8px"}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          width: { xs: "100%", sm: "100%", md: "300px" },
        }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Image
            src="/logo.png"
            alt="Picture of the author"
            width={25}
            height={25}
          />
          <Typography
            color="info.main"
            marginLeft={1}
            marginTop={"2px"}
            fontSize={16}
            fontWeight={700}
            variant={"h1"}
          >
            Somni
          </Typography>
        </Box>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => dispatch(toogleMenu())}
        >
          <MenuIcon fontSize="inherit" sx={{ color: "info.main" }} />
        </IconButton>
      </Box>

      <Box
        display={"flex"}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "info.light",
          }}
        >
          Descarga Somni:
        </Typography>
        <Link
          href="#"
          underline="hover"
          sx={{
            fontSize: "14px",
            marginLeft: 2,
            color: "info.main",
            "&:hover": {
              color: "info.light",
              cursor: "pointer",
            },
          }}
        >
          App Store
        </Link>
        <Link
          sx={{
            fontSize: "14px",
            marginLeft: 2,
            marginRight: 2,
            color: "info.main",
            "&:hover": {
              color: "info.light",
              cursor: "pointer",
            },
          }}
          href="#"
          underline="hover"
        >
          Play store
        </Link>
      </Box>
    </Box>
  );
};
