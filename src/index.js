import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { ColorModeProvider } from "./theme/ColourModeProvider";
import MUIThemeProvider from "./theme/ThemeProvider";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import Context from "./components/context/Context";
import "bootstrap/dist/css/bootstrap.css";
import { MessageProvider } from "./components/context/MessageContext";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/context/CartContext";
import "@mantine/carousel/styles.css";
import "@mantine/carousel/styles.css";
import { Provider } from "react-redux";
import store from "./Store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MantineProvider>
        <ColorModeProvider>
          <MUIThemeProvider>
            <CssBaseline />
            <Context>
              <CartProvider>
                <MessageProvider>
                  <App />
                </MessageProvider>
              </CartProvider>
            </Context>
            {/* <ToastContainer /> */}
          </MUIThemeProvider>
        </ColorModeProvider>
      </MantineProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
