import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import BouncingDotsLoader from "../../pages/loading";
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  Divider,
  IconButton,
  Button,
  Tabs,
  Tab,
  Box,
  TextField,
  Container,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseIcon from "@mui/icons-material/Close";
import tabData from "./data/Data";
import ResponseText from "./sub-components/Text";
import ResponseVideo from "./sub-components/Video";
import ResponseAudio from "./sub-components/Audio";
import ResponseImage from "./sub-components/Image";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import API_URLS from "../../config";
import Chatlogo from "../../assets/chatlogo.png";

const drawerWidth = 240;
const MainContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  display: "flex",
  overflow: "hidden",
  background: "rgb(236, 236, 255)",
  overflow: "auto",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem",
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const ResponseContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "flex-start",
  // padding:"20px",
  gap: "2rem",
  width: "100%",
  background: "rgb(236, 236, 255)",
}));

const ResponseWrapper = styled("div")(({ theme }) => ({
  border: "1px solid #d9d9e3",
  borderRadius: "0.5rem",
  padding: "2rem",
  overflow: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  justifyContent: "flex-start",
}));
const ChatTextContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 20,
  width: "900px",

  border: "2px solid #093311",
  // overflow: "auto",
  borderRadius: "15px",
  background: "transparent",

  // width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "315px",
  },
  border: "0 solid #d9d9e3",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgba(0,0,0,.4)",

  "&::-webkit-scrollbar": {
    width: "8px", // Adjust the scrollbar width as needed
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1", // Set the background color of the scrollbar track
    borderRadius: "15px", // Set the border radius of the scrollbar track
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888", // Set the color of the scrollbar thumb (handle)
    borderRadius: "15px", // Set the border radius of the scrollbar thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Set the color of the scrollbar thumb on hover
  },
}));

const ChatTextfield = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxHeight: "250px",
  // border:"2px solid #91133",
  // overflow: "auto",
  borderRadius: "15px",
  // background: "transparent",
  // background: "#fff",

  "& .MuiOutlinedInput-root": {
    alignItems: "flex-end",
    borderRadius: "15px",

    "& fieldset": {
      borderColor: "#91133",
      fontSize: "15px",
    },
    "&:hover fieldset": {
      borderColor: "#91133",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#91133",
    },
    fontSize: "15px", // Adjust the size as needed
  },
}));

const TabsContainer = styled("div")(({ theme }) => ({
  padding: "0.2rem",
  height: "100%",
  overflow: "hidden",
  ":hover": {
    overflow: "auto",
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(217,217,227,.8)",
    },
  },
  "&::-webkit-scrollbar": {
    width: "8px", // Adjust the scrollbar width as needed
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1", // Set the background color of the scrollbar track
    borderRadius: "4px", // Set the border radius of the scrollbar track
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888", // Set the color of the scrollbar thumb (handle)
    borderRadius: "4px", // Set the border radius of the scrollbar thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Set the color of the scrollbar thumb on hover
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: "50px",
  color: "#EDEDF1",
  justifyContent: "flex-start",
  "&.Mui-selected": {
    backgroundColor: "#343541",
    color: "#EDEDF1",
    borderRadius: "0.5rem",
  },
}));
const ChatInputContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 100,
  display: "flex",
  flexDirection: "column",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  justifyContent: "flex-start",
  padding: "0.8rem 1rem 0.8rem 1.5rem",
  color: "#EDEDF1",
  fontSize: "15px",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ChatSection() {
  const baseUrl = API_URLS.base;

  const theme = useTheme();
  const [chatdata, setchatData] = React.useState();
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(isSmallScreen ? false : true);
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // eslint-disable-next-line
  const [chatHistory, setChatHistory] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("Enter a query");
  const navigate = useNavigate({ forceRefresh: true });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log("Chat History : ", chatHistory);

  const handleClearConversations = () => {
    // setChatHistory([]); // Clear the chat history
    setErrorMessage(""); // Reset the error message
    setData(null); // Clear the data for the current chat
    setchatData(null); // Clear the chat data
    if (chatHistory && chatHistory.length > 0) {
      let historyIndex = 0;
      const intervalId = setInterval(() => {
        setChatHistory((prevHistory) => {
          const nextHistory = [...prevHistory];
          nextHistory.splice(historyIndex, 1); // Remove the history item at the current index
          return nextHistory;
        });
        historyIndex++;
        if (historyIndex >= chatHistory.length) {
          // Stop the loop when all chat history values have been displayed
          clearInterval(intervalId);
          setChatHistory([]); // Clear the chat history
        }
      }, 1000); // Adjust the time (in milliseconds) between each value display
    }
  };
  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleNewChat = () => {
    setQuery("");
    setData(null);
    setchatData(null);
    setErrorMessage("Enter a query");
  };
  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("mobile_number");
    Cookies.remove("token");

    // Redirect to '/'
    navigate("/");
  };
  const submitQuery = () => {
    setLoading(true);
    const reqURL = `${baseUrl}/extractTags`;
    // Inside the `submitQuery` function
    fetch(reqURL, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        query: query,
        mobile_number: Cookies.get("mobile_number"),
      }),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            setLoading(false);
            // Check if data.isSuccess or data[0].isSuccess is true
            if (data.isSuccess || (data[0] && data[0].isSuccess)) {
              setErrorMessage("");
              setData(data);
              setchatData(data);
              console.log(data, "data");
              
            } else {
              // Handle case when no results are found
              setErrorMessage(
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="./serviceload.png"
                      alt="Custom Image"
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />
                    <div></div>
                    <Typography
                      variant="body2"
                      component="body1"
                      textAlign="center"
                      sx={{ mt: 2, color: "black", fontSize: "15px" }}
                    >
                      We have noted your query, in the next 1-2 business days,
                      we will update with the required response & keep you
                      posted.
                    </Typography>
                  </div>
                </>
              );
              setData(null);
              setchatData(null);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <MainContainer>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#353540",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Can you provide me w...
          </Typography>
          {open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                border: "1px solid #d9d9e3",
                borderRadius: "0.5rem",
                padding: "0.3rem",
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleNewChat}
            >
              <AddIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: "#212023",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            padding: "0.3rem",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            fullWidth
            sx={{
              textTransform: "none",
              justifyContent: "flex-start",
              padding: "0.5rem 1rem 0.5rem 1rem",
              color: "#EDEDF1",
              borderColor: "#4D4D4F",
              fontSize: "15px",
            }}
            onClick={handleNewChat}
          >
            New Chat
          </Button>
        </Box>

        <TabsContainer>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            // sx={{ borderRight: 1, borderColor: "divider" }}
            TabIndicatorProps={{ style: { display: "none" } }}
          >
            {chatHistory ? (
              <div>
                {tabData.map((item, index) => {
                  return (
                    <StyledTab
                      key={index}
                      icon={
                        <ChatBubbleOutlineIcon
                          sx={{
                            fontSize: "1rem",
                          }}
                        />
                      }
                      iconPosition="start"
                      label={
                        item.title && item.title.length > 20
                          ? item.title.slice(0, 20) + "..."
                          : item.title
                      }
                      {...a11yProps(index)}
                    />
                  );
                })}
              </div>
            ) : (
              <Typography
                variant="body2"
                component="body1"
                textAlign="center"
                sx={{
                  mt: 2,
                  color: "#EDEDF1",
                  fontSize: "15px",
                }}
              >
                Your history will appear here.
              </Typography>
            )}
          </Tabs>
        </TabsContainer>
        <Divider
          sx={{
            backgroundColor: "#4D4D4F",
          }}
        />
        <ActionButton
          startIcon={<ArrowBackIcon />}
          fullWidth
          onClick={() => navigate("/dashboard")} // Navigate to the "/dashboard" page
        >
          Back
        </ActionButton>

        <ActionButton
          startIcon={<DeleteOutlineOutlinedIcon />}
          fullWidth
          onClick={handleClearConversations}
        >
          Clear conversations
        </ActionButton>
        <ActionButton
          startIcon={<HelpOutlineOutlinedIcon />}
          fullWidth
          onClick={() => navigate("/help")}
        >
          Help
        </ActionButton>
        <ActionButton
          startIcon={<LogoutOutlinedIcon />}
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </ActionButton>
      </Drawer>

      <Main open={open}>
        <>
          {!chatdata && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              <div style={{ height: "70px", width: "70px" }}>
                <img
                  style={{ height: "100%", width: "100%" }}
                  src={Chatlogo}
                  alt=""
                />
              </div>

              <h1>How can I help you today?</h1>
            </div>
          )}
        </>

        <Container
          maxWidth="md"
          maxHeight="100%"
          background="#ececff"
          sx={{
            marginBottom: "6rem",
          }}
        >
          {loading ? (
            <BouncingDotsLoader />
          ) : (
            <ResponseContainer>
              {chatdata &&
                (Array.isArray(chatdata) ? (
                  <ResponseWrapper>
                    {chatdata &&
                      Object.entries(chatdata[0]).map(([key, value]) => {
                        return value && value.length > 0 && key !== "Tags" ? (
                          <ResponseText
                            key={key}
                            text={value}
                            uniqueId={chatdata.UniqueId}
                          />
                        ) : (
                          <React.Fragment key={key} />
                        );
                      })}
                  </ResponseWrapper>
                ) : (
                  <ResponseWrapper>
                    {chatdata &&
                      Object.entries(chatdata).map(([key, value]) => {
                        return value && value.length > 0 && key !== "Tags" ? (
                          <ResponseText
                            key={key}
                            text={value}
                            uniqueId={chatdata.UniqueId}
                          />
                        ) : (
                          <React.Fragment key={key} />
                        );
                      })}

                    <>
                      {chatdata?.Image?.length > 0 && chatdata.Image ? (
                        <ResponseImage text={chatdata.Image} />
                      ) : null}
                      {chatdata?.Video?.length > 0 && chatdata.Video ? (
                        <ResponseVideo src={chatdata.Video} />
                      ) : null}

                      {chatdata?.Audio?.length > 0 && chatdata.Audio ? (
                        <ResponseAudio src={chatdata.Audio} />
                      ) : null}
                    </>
                  </ResponseWrapper>
                ))}
            </ResponseContainer>
          )}
          {/* </TabPanel>
            );
          })} */}

          {!data?.isChat && (
            <ChatTextContainer>
              <ChatTextfield
                label=""
                variant="outlined"
                placeholder="Type a Query..."
                multiline
                autoFocus
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="submit query"
                      color="primary"
                      onClick={submitQuery}
                      sx={{
                        padding: "0",
                      }}
                    >
                      <SendOutlinedIcon />
                    </IconButton>
                  ),
                }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  // enter without shift
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitQuery();
                    setQuery("");
                    setErrorMessage("");
                  }
                  // shift + Enter
                  if (e.key === "Enter" && e.shiftKey) {
                    setQuery(query + "\n");
                    setErrorMessage("");
                  }
                }}
              />
            </ChatTextContainer>
          )}
          {/* <ChatInputContainer>
            {errorMessage && (
              <ResponseWrapper
                variant="body2"
                component="body1"
                textAlign="center"
                sx={{ mt: 2, fontSize: "15px" }}
              >
                {errorMessage}
              </ResponseWrapper>
            )}
          </ChatInputContainer> */}
        </Container>
      </Main>
    </MainContainer>
  );
}
