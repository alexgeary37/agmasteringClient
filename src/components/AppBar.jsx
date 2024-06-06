import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../contexts/UserContext";

const pages = ["HOME", "START A PROJECT", "CONTACT"];
const settings = ["PROFILE", "LOGOUT"];

export default function ResponsiveAppBar() {
  let navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page === "HOME") navigate("/");
    if (page === "START A PROJECT") navigate("/start-a-project");
    if (page === "CONTACT") navigate("/contact");
    setAnchorElNav(null);
  };

  const handleOpenLoggedInMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseLoggedInMenu = (setting) => {
    if (setting === "PROFILE") {
      navigate("/user-profile");
    }
    if (setting === "LOGOUT") {
      updateUser(null);
      localStorage.removeItem("signFrom");
      navigate("/");
    }
    setAnchorElUser(null);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              flexGrow: 1,
              fontFamily: "lastica",
              fontWeight: 1000,
              letterSpacing: "0.1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AG MASTERING
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block", ml: 1 }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, marginX: 1 }}>
            {!user && (
              <div>
                <Button
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                  sx={{
                    mx: 1,
                    color: "white",
                    fontWeight: "bold", // Add fontWeight
                    border: "2px solid white", // Add border
                    borderRadius: "8px", // Add borderRadius
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // Add hover effect
                    },
                  }}
                >
                  SIGN UP
                </Button>
                <Button
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                  sx={{
                    mx: 1,
                    color: "white",
                    fontWeight: "bold", // Add fontWeight
                    border: "2px solid white", // Add border
                    borderRadius: "8px", // Add borderRadius
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // Add hover effect
                    },
                  }}
                >
                  SIGN IN
                </Button>
              </div>
            )}
          </Box>
          {user && (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenLoggedInMenu}
                  sx={{ ml: 2, p: 0 }}
                >
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseLoggedInMenu(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseLoggedInMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {user ? (
                settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseLoggedInMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              ) : (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/sign-up");
                    }}
                  >
                    SIGN UP
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/sign-in");
                    }}
                  >
                    SIGN IN
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
