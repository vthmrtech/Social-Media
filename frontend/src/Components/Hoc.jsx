import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import BlockIcon from "@mui/icons-material/Block";
import { NavLink, useNavigate } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material";
import Swal from "sweetalert2";
import { Context } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {  logoutAccount } from "../Store/actions/userActions";
import { getRequests } from "../Store/actions/requestsAction";

export const HOC = (Component) => {
  const pages = ["home", "requests", "profile"];
  const NewComp = () => {
    const userInfo = useSelector((state) => state.users.data)

    const allRequests = useSelector((state) => state.requests.requests)
    let isLogin = useContext(Context);
    const [loginUser, setloginUser] = useState(userInfo)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const dispatch = useDispatch();
    const navigate  = useNavigate()

    useEffect(() =>{
      dispatch(getRequests())
      setloginUser(JSON.parse(localStorage.getItem("user")))
      
      
    },[])
    
    useEffect(() =>{
      setloginUser(userInfo)
      
    },[userInfo])

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };



    const logout = () => {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          // localStorage.setItem('isLogin', false)
          // localStorage.setItem('loginId',JSON.stringify(""))
          dispatch(logoutAccount());
          isLogin.setLogin(false);
          isLogin.setuserName(undefined);
          Swal.fire({
            title: "Logout",
            text: "Logout Successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };

    return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ order: 2, width: "100%" }}>
          <AppBar sx={{ position: "sticky", top: 0, zIndex: 99 }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  LOGO
                </Typography>

                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <NavLink to={`/${page}`}>
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: "white",
                          display: "block",
                          fontSize: "20px",
                        }}
                      >
                        {page}
                        {page == "requests" &&
                        allRequests.length > 0 ? (
                          <span
                            className="bg-white text-dark  fs-6 d-flex align-items-center justify-content-center position-absolute rounded-circle fw-bold"
                            style={{
                              height: "17px",
                              width: "20px",
                              top: "-2px",
                              right: "-4px",
                            }}
                          >
                            {
                              allRequests.length  
                            }
                          </span>
                        ) : (
                          ""
                        )}
                      </Button>
                    </NavLink>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          `http://localhost:4000/image/uploads/profile/${loginUser.profileImg}`
                        }
                        sx={{ height: "70px", width: "70px" }}
                      />
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
                    onClose={handleCloseUserMenu}
                  >
                    <NavLink to={"/profile"}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <AccountCircle className="me-2" />
                          Profile
                        </Typography>
                      </MenuItem>
                    </NavLink>
                    <NavLink to={"/blocklist"}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <BlockIcon className="me-2" />
                          Block List
                        </Typography>
                      </MenuItem>
                    </NavLink>
                    <MenuItem onClick={logout}>
                      <Typography textAlign="center">
                        <Logout className="me-2" />
                        LogOut{" "}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          <Component />
        </Box>
      </Box>
    );
  };

  return NewComp;
};
