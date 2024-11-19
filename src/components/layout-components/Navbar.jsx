
import styled from "@emotion/styled";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { CartState } from "../context/Context";
import ToggleButton from "./ToggleButton";

// import toast from "react-hot-toast";
import { Popover } from "@mantine/core";
import { IconGridDots } from "@tabler/icons-react";
import { toast } from "react-toastify";

const pages = [
  {
    url: "/",
    name: "Home",
  },
  // {
  //   //url: "/internship",
  //   url: "/services",
  //   name: "e-Learning",
  // },
  {
    //url: "/internship",
    url: "/elearning",
    name: "e-Learning",
  },
  {
    url: "/eureka",
    name: "Eureka",
  },
    
  {
    url: "/dashboard",
    name: "eureka",
  },
  {
    url:"/innofab",
    name:"InnoFab"
  },

  {
    url: "/innomart",
    name: "InnoMart",
  },
];
const userDashboard = [
  {
    url: "/subscription",
    name: "subscription",
  },
];
// const settings = ["Profile", "Account", "eureka", "Logout"];

function Navbar() {
  const {
    state: { cart },
  } = CartState();

  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isGlassy, setIsGlassy] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const userIsLoggedIn = !!Cookies.get("token"); // Replace with your actual logic
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0 && !isGlassy) {
        setIsGlassy(true);
      } else if (scrollY === 0 && isGlassy) {
        setIsGlassy(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isGlassy]);
  const handleLogout = () => {
    // Implement your logout logic here
    Cookies.remove("mobile_number");
    Cookies.remove("token"); // Remove the token from cookies

    setIsLoggedIn(false); // Set the login status to false
  };

  const handleMouseEnter = (pages) => {
    // ("pages", pages);
    if (pages.name === "InnoMart") {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleMouseLeave = (pages) => {
    if (pages.name === "InnoMart") {
      setShow(false);
    } else {
      setShow(false);
    }
  };

  const handleNavigate = () => {
    // ("clicked", isLoggedIn);
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      // ("else block");
      toast.error("please login before view cart");
    }
  };
  const handleItemNavigate = (item) => {
    // ("item", item);
    if (isLoggedIn) {
      if(item.name==="InnoFab"){
        navigate("/ordersection")
      }
      else{
        navigate(item.url);
      }
    
    } else {
      if ( item.name === "Home" || item.name==="InnoFab" ) {
        navigate(item.url);
      } else {
        // toast.error("please login before navigate ");
        navigate("/eureka");
      }
    }
  };
  // ("open", open);

  return (
    <AppBar
      position="fixed"
      sx={{
        marginBottom: "2rem",

        backgroundColor: isGlassy
          ? theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.5)"
          : theme.palette.mode === "dark"
          ? "transparent"
          : "transparent",
        backdropFilter: isGlassy ? "saturate(180%) blur(20px);" : "none",
        boxShadow: isGlassy ? "inset 0 -1px 0 0 rgba(0,0,0,.1);" : "none",
        transition:
          "background-color 0.5s ease-in-out, backdrop-filter 0.5s ease-in-out",
      }}
    >
      <Container maxWidth="lg" style={{ paddingInline: "50px" }}>
        <Toolbar
          sx={{
            margin: "0.2rem 1.2rem  0.2rem 0",
          }}
          variant="dense"
          disableGutters
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <a href="/">
              {theme.palette.mode === "dark" ? (
                <img
                  src="/innotrat-dark.svg"
                  alt="logo"
                  // height={30}
                  className="w-15 h-10"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img
                  src="/innotrat-light.svg"
                  alt="logo"
                  className="w-15 h-10"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              )}
            </a>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                sx={{
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              />
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages
                .filter((page) => {
                  if (isLoggedIn) {
                    return page.name !== "Eureka" 
                  } else {
                    return page.name !== "eureka";
                  }
                })
                .map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu();
                      window.location.href = page.url;
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>


          
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "center",
              mr: 2,
            }}
          >
            <a href="/">
              {theme.palette.mode === "dark" ? (
                <img
                  src="/innotrat-dark.svg"
                  alt="logo"
                  width={140}
                  height={50}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img
                  src="/innotrat-light.svg"
                  alt="logo"
                  width={140}
                  height={50}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              )}
            </a>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 4,
            }}
            className="relative"
          >
            {pages
              .filter((page) => {
                if (isLoggedIn) {
                  return page.name !== "Eureka" 
                } else {
                  return page.name !== "eureka" ;
                }
              })
              .map((page) => (

                <Link
                  key={page.name}
                  onClick={() => handleItemNavigate(page)}
                  color="#034aac"
                  underline="none"
                  sx={{
                    fontSize: "1.9rem",
                    lineHeight: "1rem",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => handleMouseEnter(page)}
                  onMouseLeave={() => handleMouseLeave(page)}
                >
                  {page.name}
                </Link>
              ))}
            {show && isLoggedIn && (
              <>
                <div
                  className="flex flex-col gap-3 cursor-pointer  justify-center items-center text-lg absolute  top-6  right-28 py-4  w-64 
                   font-light bg-[#e9e9e9] shadow-md rounded-md "
                  //  style={{backgroundColor:"#e9e9e9"}}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <span
                    className=" w-full text-center hover:bg-[#ffffff] py-2   text-2xl  text-black"
                    onClick={() => navigate("/innobator")}
                  >
                    Innobator
                  </span>
                  <span
                    className=" w-full text-center hover:bg-[#ffffff] py-2 font-medium text-2xl   text-black  "
                    onClick={() => navigate("/innolegal")}
                  >
                    InnoLegal
                  </span>
                  <span
                    className=" w-full text-center hover:bg-[#ffffff] py-2   text-2xl  font-medium  text-black"
                    onClick={() => navigate("/innomechanical")}
                  >
                    InnoMechanical
                  </span>
                  <span
                    className=" w-full text-center hover:bg-[#ffffff] py-2   text-2xl  font-medium  text-black"
                    onClick={() => navigate("/innodesign")}
                  >
                    InnoDesign
                  </span>
                </div>
              </>
            )}

            {/* <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                fontWeight: 550,
                textTransform: "none",
              }}
              onClick={() => {
                window.location.href = "/sign-up";
              }}
            >
              Sign Up
            </Button> */}
          </Box>

         {isLoggedIn &&  <Popover
            width={500}
            position="bottom"
            withArrow
            shadow="md"
            opened={open}
            onChange={setOpen}
          >
            <Popover.Target>
              <IconGridDots
                onClick={() => setOpen((prev) => !prev)}
                className=" mr-5  text-black cursor-pointer   flex justify-center items-center"
              />
            </Popover.Target>
            <Popover.Dropdown className=" flex flex-wrap gap-1   items-center ">
              {userDashboard.map((item, i) => (
                <div
                  className="border-[1px]  shadow-md  rounded-xl w-full md:w-1/3  px-2 py-5 text-center cursor-pointer mb-2 md:mb-0 "
                  key={i}
                  onClick={() => navigate(item.url)}
                >
                  {item.name}
                </div>
              ))}
            </Popover.Dropdown>
          </Popover>}

          <ToggleButton />

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Kiran Gowda" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        {isLoggedIn &&   <div className="cursor-pointer " onClick={handleNavigate}>
            <StyledBadge>
              <Badge
                badgeContent={isLoggedIn ? cart?.length : ""}
                color={isLoggedIn ? "primary" : "default"}
              >
                <ShoppingCartOutlined
                  className="cart-icon"
                  color="action"
                  style={{ marginRight: "14px" }}
                ></ShoppingCartOutlined>
              </Badge>
            </StyledBadge>
          </div>}
          {/* <div className="font-bold text-black mx-5 cursor-pointer relative ">
            <IconGridDots />
          </div> */}

          <NavLink
            to="/eureka 
           "
          >
            <Button
              size="md"
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "550",
                textTransform: "none",
                marginLeft: "4rem",
                [theme.breakpoints.down("sm")]: {
                  marginLeft: "-5px",
                },
              }}
              onClick={isLoggedIn ? handleLogout : null}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </NavLink>
        </Toolbar>
      </Container>
    </AppBar>

    








  );
}

const StyledBadge = styled.div`
  .cart-icon {
    font-size: 2.3rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 1.3rem;
  }
`;
export default Navbar;
