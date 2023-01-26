import { useEffect } from "react";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
          target="_blank"
          href="https://apps.apple.com/cl/app/somni/id1632049297?l=en"
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
          target="_blank"
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
          href="https://play.google.com/store/apps/details?id=com.somni"
          underline="hover"
        >
          Play store
        </Link>
      </Box>
    </Box>
  );
};
