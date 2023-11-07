import { useEffect } from "react";

//Next
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

//Material
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

//Service
import { useLogOutMutation } from "../../services/login";

// Utils
import { menuUtilis } from "../../utils";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail, setEmpresaId } from "../../slices/homeSlice";

// Types
import type { RootState } from "../../store";

//Constantes
const ButtonMenu = {
  padding: "5px 5px",
  "&:hover": {
    color: "info.main",
    borderRadius: "0 10px 10px 0",
    backgroundColor: "secondary.light",
    cursor: "pointer",
  },
};
const ButtonMenuActive = {
  padding: "5px 5px",
  color: "info.main",
  borderRadius: "0 10px 10px 0",
  backgroundColor: "secondary.light",
};

export const Menu = () => {
  const dispatch = useDispatch();

  const menu = useSelector((state: RootState) => state.home.menu);
  const name = useSelector((state: RootState) => state.home.name);
  const email = useSelector((state: RootState) => state.home.email);

  const { asPath, reload } = useRouter();
  const [logOut, result] = useLogOutMutation();

  useEffect(() => {
    if (result.isSuccess) {
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, reload]);

  useEffect(() => {
    if (name === "") {
      dispatch(setName(`${getCookie("name")}`));
      dispatch(setEmail(`${getCookie("email")}`));
      dispatch(setEmpresaId(`${getCookie("empresa_id")}`));
    }
  });

  return (
    <Box
      sx={{
        zIndex: 10,
        position: { xs: "fixed", sm: "fixed", md: "relative" },
      }}
    >
      <Collapse orientation="horizontal" in={menu}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"space-between"}
          sx={{
            backgroundColor: "secondary.main",
            width: { xs: "100vw", sm: "100vw", md: "300px" },
          }}
        >
          <Box
            padding={"8px"}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            flex={1}
            marginTop={1}
          >
            <Avatar {...menuUtilis.stringAvatar(email)} />
            <Typography
              color="info.main"
              variant="h4"
              textAlign={"center"}
              fontSize={"14px"}
              marginTop={1}
            >
              {email}
            </Typography>
            <Typography
              color="secondary.light"
              variant="h4"
              textAlign={"center"}
              fontSize={"12px"}
              marginTop={0.5}
            >
              {name}
            </Typography>
          </Box>
          <Box
            marginTop={1}
            display={"flex"}
            justifyContent={"space-between"}
            flex={1}
            width={"100%"}
            borderTop={"solid 1px red"}
            sx={{
              borderColor: "secondary.light",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flex={1}
              borderRight={"solid 1px red"}
              sx={{
                padding: "20px 10px",
                borderColor: "secondary.light",
              }}
            >
              <IconButton aria-label="cart">
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon
                    sx={{
                      color: "secondary.light",
                    }}
                  />
                </Badge>
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              flex={1}
              justifyContent={"center"}
              alignItems={"center"}
              borderRight={"solid 1px red"}
              sx={{
                padding: "20px 10px",
                borderColor: "secondary.light",
              }}
            >
              <IconButton aria-label="cart">
                <EmailIcon
                  sx={{
                    color: "secondary.light",
                  }}
                />
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              flex={1}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                padding: "20px 10px",
              }}
            >
              <IconButton aria-label="cart" onClick={logOut}>
                <LogoutIcon
                  sx={{
                    color: "secondary.light",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            flex={1}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            flexWrap={"wrap"}
            sx={{
              backgroundColor: "primary.light",
              minHeight: { xs: "auto", sm: "auto", md: "calc(100vh - 248px)" },
            }}
          >
            <Typography
              color="primary"
              variant="h4"
              fontSize={"16px"}
              marginTop={3}
              marginLeft={2}
              fontWeight={800}
              textTransform={"uppercase"}
            >
              Menu
            </Typography>

            <Box marginLeft={1.5} marginTop={2}>
              <ul className="menu--dashboard">
                <li>
                  <NextLink href="/">
                    <Typography
                      color="primary"
                      variant="body2"
                      fontWeight={400}
                      fontSize={"14px"}
                      display={"flex"}
                      alignItems={"center"}
                      sx={
                        asPath === "/dashboard" ? ButtonMenuActive : ButtonMenu
                      }
                    >
                      <DashboardIcon
                        sx={{
                          marginRight: "8px",
                          color: "secondary.main",
                        }}
                      />{" "}
                      Dashboard
                    </Typography>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/dashboard/users">
                    <Typography
                      color="primary"
                      variant="body2"
                      fontWeight={400}
                      fontSize={"14px"}
                      display={"flex"}
                      alignItems={"center"}
                      sx={
                        asPath === "/dashboard/users" ||
                        asPath === "/dashboard/users/add-user"
                          ? ButtonMenuActive
                          : ButtonMenu
                      }
                    >
                      <PeopleAltIcon
                        sx={{
                          marginRight: "8px",
                          color: "secondary.main",
                        }}
                      />{" "}
                      Usuarios
                    </Typography>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/dashboard/control">
                    <Typography
                      color="primary"
                      variant="body2"
                      fontWeight={400}
                      fontSize={"14px"}
                      display={"flex"}
                      alignItems={"center"}
                      sx={
                        asPath === "/dashboard/control"
                          ? ButtonMenuActive
                          : ButtonMenu
                      }
                    >
                      <BrowseGalleryIcon
                        sx={{
                          marginRight: "8px",
                          color: "secondary.main",
                        }}
                      />{" "}
                      Control de personas
                    </Typography>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/dashboard/details">
                    <Typography
                      color="primary"
                      variant="body2"
                      fontWeight={400}
                      fontSize={"14px"}
                      display={"flex"}
                      alignItems={"center"}
                      sx={
                        asPath === "/dashboard/details"
                          ? ButtonMenuActive
                          : ButtonMenu
                      }
                    >
                      <DisplaySettingsIcon
                        sx={{
                          marginRight: "8px",
                          color: "secondary.main",
                        }}
                      />{" "}
                      Detalles de controles
                    </Typography>
                  </NextLink>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
